#!/opt/funnelback/linbin/ActivePerl/bin/perl -w

#
# generate_analytics.pl
#
# Purpose: generate some fake analytics for a collection
#
# usage - ./generate_analytics.pl collection profile
# 
# Requires the following files to be created inside the collection's conf folder:
#  
# query-word-list.cfg
#   query terms to be used for the successful queries, 1 term per line
# query-zero-word-list.cfg
#   query terms to be used for the unsuccessful queries, 1 term per line
# query-spike-word-list.cfg
#   query terms to be used for generating spikes.  These should also be in the query-word-list.cfg
#

use strict;

if (($#ARGV + 1) != 2) {
        print "Usage: ./generate_analytics.pl collection profile\n";
        print "e.g.: ./generate_analytics.pl shakespeare _default\n";
        exit;
}

# Check SEARCH_HOME is defined
if (not $ENV{"SEARCH_HOME"}) {
    print "$0: Error: \$SEARCH_HOME environment variable is not defined, cannot continue\n";
    exit 1;
}

my $SEARCH_HOME = $ENV{"SEARCH_HOME"};

my $now = time();

my ($sec, $min, $hour, $day, $month, $year) = (localtime($now))[0,1,2,3,4,5];

# calculate midnight this morning 
my $referencetime = $now - $sec - $min*60 - $hour*3600;
my $collection = $ARGV[0];
my $profile = $ARGV[1];

my $today=sprintf ("%04d%02d%02d",$year+1900,$month+1,$day);

my $search_link = "http://example.fbsearch.com/s/search.html";
my $query_log_file = "$SEARCH_HOME/data/$collection/archive/queries.$today-$now.log";
my $click_log_file = "$SEARCH_HOME/data/$collection/archive/clicks.$today-$now.log";

# get 100 random URLs from the search index for use in the click logs
# Note: using real URLs from the index rather than stored URLs because stored.log won't work for XML etc.
#my @click_urls = `$SEARCH_HOME/bin/padre-show $SEARCH_HOME/data/$collection/live/idx/index.urls | shuf -n 100`;
my @padre_response = `echo '!geturls' | $SEARCH_HOME/bin/padre-sw $SEARCH_HOME/data/$collection/live/idx/index -res=urls -num_ranks=100 -sort=shuffle`;

# we are only interested in the contents of the <res> items which just contain a URL.
#| grep '<res>' | sed -e 's/<res>//g' -e 's/<\\/res>//g'
# my $response = join (',',@padre_response);
my @click_urls = (join ("",@padre_response)) =~ m@<res>(.+?)</res>@g;
#foreach (@click_urls) { print "$_\n"; }

my $clickurlsize = 100;
if (scalar @click_urls < 100) {
    $clickurlsize = scalar @click_urls;
}
# 1 in 50 queries (2%) can generate a click
my $click_chance = 50;

my $rep;
my $log;
my $spike_query_log;
my $chance_of_spike_query;
my $ip;

# Standard log values.
my $full = 10;
my $partial = 20;
my $elapsed_time = 3;

# words that will populate the top queries list
open (FH, "< $SEARCH_HOME/conf/$collection/$profile/query-word-list.cfg") or die "Can't open query-word-list.cfg for read: $!";
my @random_words = <FH>;
close FH or die "Cannot close query-word-list.cfg: $!";

# words that will populate the zero queries list
open (FH, "< $SEARCH_HOME/conf/$collection/$profile/query-zero-word-list.cfg") or die "Can't open query-zero-word-list.cfg for read: $!";
my @zero_words = <FH>;
close FH or die "Cannot close query-zero-word-list.cfg: $!";

# (short) list of words used to generate query spikes (trend alerts)
open (FH, "< $SEARCH_HOME/conf/$collection/$profile/query-spike-word-list.cfg") or die "Can't open spike-query-word-list.cfg for read: $!";
my @spike_words = <FH>;
close FH or die "Cannot close query-spike-word-list.cfg: $!";


# Open log file to write to.
open(DAT,">>", $query_log_file) || die("Cannot Open $query_log_file");
# Open log file to write to.
open(CDAT,">>", $click_log_file) || die("Cannot Open $click_log_file");

foreach my $spike_query (@spike_words) {
    print "Generating queries and spike of $spike_query\n";
    # Generate 1 years worth of queries (31536000 seconds)
    for ($rep = 31536000; $rep >= 0; $rep -= 86400) {
        # Generate queries - generate between 1000 and 1000 queries a day, emulating a std distribution
        my $dailyqueries = int rand(400)+1000;
        for (my $i = 0; $i<$dailyqueries; $i++) {
            # obtain an offset - by summing several random numbers together and dividing you can approx a std distribution.
            my $offset = (int rand(86400) + int rand(86400) + int rand(86400) + int rand(86400) + int rand(86400) + int rand(86400) + int rand(86400) + int rand(86400) + int rand(86400) + int rand(86400) + int rand(86400) + int rand(86400))/12;

            # + 43200 required to shift the std distribution to the middle of the day
            #$log = $referencetime - $rep + $offset + 43200;
            $log = $referencetime - $rep + $offset;
            $ip = join ".", map int rand 256, 1 .. 4;

            # Set up query spike with some randomness.
            $chance_of_spike_query = 100;
            if ($rep > 0 && $rep < 100000) {
                    $chance_of_spike_query = 5;
            }

            # Should this log be the spike query or a random one?
            if (int(rand($chance_of_spike_query)) == 1) {
                    $spike_query_log = $spike_query;
            } else {
                my $random_index = rand @random_words;
                $spike_query_log = $random_words[$random_index];
            }
            $spike_query_log =~ s/\n//g;
            print DAT scalar localtime($log) . ",$ip,$spike_query_log,,,0,10,2x,$full,$partial,$elapsed_time,$profile,-\n";

            # Sometimes generate a click

            # Should this query result in a click?
            if (int(rand($click_chance)) == 1) {
                my $click_rank = int rand(10)+1;
                my $click_query = $spike_query_log;
                my $url_rand = int rand($clickurlsize);
                my $click_url = $click_urls[$url_rand];
                $click_url =~ s/\n//g;
                if ($click_url !~ /^http/) {
                  $click_url =~ s@^@http://@;  
                };
                $click_query =~ s/ /%20/g;
                $click_query =~ s/\n//g;
                my $click_type="CLICK";
                # make 2% of these clicks a best bets click
                if (int(rand(50)) == 1) {
                    $click_type="FP";
                }
                print CDAT scalar localtime($log) . ",$ip,$search_link?collection=$collection&profile=$profile&query=$click_query,$click_rank,$click_url,$click_type,-\n";
            }

        }    
    }
}
# Generate zero query data
print "Generating queries for zero query report\n";

# Generate 1 year worth of queries (31536000 seconds)
for ($rep = 31536000; $rep >= 0; $rep -= 86400) {

    # randomise the number of daily queries
    my $dailyqueries = int rand(20)+250;
    for (my $i = 0; $i<$dailyqueries; $i++) {
        # obtain an offset - by summing several random numbers together and dividing you can approx a std distribution.
        my $offset = (int rand(86400) + int rand(86400) + int rand(86400) + int rand(86400) + int rand(86400) + int rand(86400) + int rand(86400) + int rand(86400) + int rand(86400) + int rand(86400) + int rand(86400) + int rand(86400))/12;

        # + 43200 required to shift the std distribution to the middle of the day
        #$log = $referencetime - $rep + $offset + 43200;
        $log = $referencetime - $rep + $offset;
        $ip = join ".", map int rand 256, 1 .. 4;

        my $random_index = rand @zero_words;
        $spike_query_log = $zero_words[$random_index];
        $spike_query_log =~ s/\n//g;
        
        print DAT scalar localtime($log) . ",$ip,$spike_query_log,,,0,10,2x,0,0,$elapsed_time,$profile,-\n";
    }    
}

# Close log files

close(DAT);
close(CDAT);
