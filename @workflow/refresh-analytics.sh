#!/bin/bash -x

#===========================================================================================# 
# Funnelback Analytics demo refresh script                                                  #
# Author: Peter Levan, 2017                           `                                     #
#                                                                                           #
# Refreshes the analytics for the collection to have analytics for the last year.           #                                                   
#                                                                                           #
# Usage: ./refresh-analytics.sh -c COLLECTION                                               #
#                                                                                           #
#===========================================================================================# 


# Check for lock filellow the collection.cfg variables to be passed in and made available within this script.
# Pass the variables in as -c $COLLECTION_NAME -g $GROOVY_COMMAND -v $CURRENT_VIEW -p <comma separated list of profiles>


while getopts ":c:" opt; do
  case $opt in
    c) COLLECTION_NAME="$OPTARG"
    ;;
    \?) echo "Invalid option -$OPTARG" >&2
    ;;
  esac
done

if [ -f /opt/funnelback/data/${COLLECITON_NAME}/log/generate_analytics.lock ]; then
	echo "Error: Lock file exists."
	exit 1
else
	# Create basic lock file
	touch /opt/funnelback/data/${COLLECTION_NAME}/log/generate_analytics.lock

	# Remove existing analytics
	rm -f /opt/funnelback/data/${COLLECTION_NAME}/archive/*
	rm -f /opt/funnelback/admin/reports/${COLLECTION_NAME}/reports.sqlitedb
	rm -f /opt/funnelback/admin/reports/${COLLECTION_NAME}/outliers-*

	# Generate new analytics data (Note: using customised generate script to generate 12 months of data)
	/opt/funnelback/conf/${COLLECTION_NAME}/@workflow/generate_analytics.pl ${COLLECTION_NAME} _default

	# Update the analytics reports
	/opt/funnelback/linbin/ActivePerl/bin/perl-static /opt/funnelback/bin/reports-load-queries-log.pl --collection ${COLLECTION_NAME}

	# Update outliers (trend alerts)
	/opt/funnelback/linbin/ActivePerl/bin/perl-static /opt/funnelback/bin/outliers-log-processing.pl --collection ${COLLECTION_NAME}

	# Remove lock file
	rm /opt/funnelback/data/${COLLECTION_NAME}/log/generate_analytics.lock

	echo "Report regeneration for ${COLLECTION_NAME} complete!"
fi

