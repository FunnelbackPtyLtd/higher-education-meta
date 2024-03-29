<#ftl encoding="utf-8" output_format="HTML" />

<#-- 
  This template outputs only the HTML component of the Higher Education Vertical Product 
  (excluding the header and footer). This is required in the scenario where the target CMS 
  want to be responsible for displaying the header and footer and serve up all the css
  and javascript. 

  e.g. Squiz Matrix Neo Templates: https://marketplace-dev.squiz.systems/hugo/fb-search-esi 
-->

<#-- Core Funnelback imports -->
<#import "/web/templates/modernui/funnelback_classic.ftl" as s/>
<#import "/web/templates/modernui/funnelback.ftl" as fb />

<#-- 
	Global Stencils imports
	The namespace will be available in all templates which are imported 
-->
<#import "base.ftl" as base />
<#import "hero_banner.ftl" as hero_banner />
<#import "search_tools.ftl" as search_tools />
<#import "counts.ftl" as counts />
<#import "query_blending.ftl" as query_blending />
<#import "spelling_suggestions.ftl" as spelling_suggestions />
<#import "curator.ftl" as curator />
<#import "tabs.ftl" as tabs />
<#import "facets.breadcrumbs.ftl" as facets_breadcrumbs />
<#import "facets.ftl" as facets />
<#import "tier_bars.ftl" as tier_bars />
<#import "pagination.ftl" as pagination />
<#import "a-z_listing.ftl" as az_listing />
<#import "contextual_navigation.ftl" as contextual_navigation />
<#import "auto_complete.ftl" as auto_complete />
<#import "auto_complete.concierge.ftl" as concierge />
<#import "curator.ftl" as curator />
<#import "result_list.ftl" as result_list />
<#import "no_results.ftl" as no_results />
<#import "extra_search.ftl" as extra_search />
<#import "results.ftl" as results />
<#import "client_includes.ftl" as client_includes />

<#import "sessions.ftl" as sessions />


<#-- Specific result styling imports
	These imports are required for the automatic template selection to work
	The various namespaces (e.g. 'video', 'facebook') need to be on the main scope 
-->
<#import "results.courses.ftl" as courses />
<#import "results.programs.ftl" as programs />
<#import "results.people.ftl" as people />
<#import "results.video.ftl" as video />
<#import "results.facebook.ftl" as facebook />
<#import "results.events.ftl" as events />
<#import "results.twitter.ftl" as twitter />
<#import "results.instagram.ftl" as instagram />

<#-- Used to send absolute URLs for resources -->
<#assign httpHost=httpRequest.getHeader('host')!"">

<#-- Import the icons so that they are available using the <use> directive. -->
<div style="display:none">
    <#include "utilities.icons.ftl" />
</div>
<div class="stencils__main higher-education">
            
<@hero_banner.SearchForm />
<@tabs.Tabs />

<div class="funnelback-search no-wysiwyg">			
    <div class="funnelback-search__body" id="funnelbach-search-body">
        <h2 class="funnelback-search__title">Results</h2>
        
        <@search_tools.SearchTools />
        
        <@query_blending.QueryBlending />
        <@spelling_suggestions.SpellingSuggestions />
        <@facets_breadcrumbs.Breadcrumb />

        <@s.AfterSearchOnly>						
            <@curator.HasCuratorOrBestBet position="top">
                <@curator.Curator position="top" />
            </@curator.HasCuratorOrBestBet>

            <@no_results.NoResults />
            <@result_list.ResultList />

            <@curator.HasCuratorOrBestBet position="bottom">
                <@curator.Curator position="bottom" />
            </@curator.HasCuratorOrBestBet>

        </@s.AfterSearchOnly>

        <@pagination.Pagination />
        <@contextual_navigation.ContextualNavigation />
    </div>

    <div class="funnelback-search__side" id="funnelbach-search-facets">					
        <#-- Get facets for the current selected tab -->
        <#assign tabFacets = question.getCurrentProfileConfig().get("stencils.tabs.facets.${(response.customData.stencils.tabs.selected)!}")!>

        <@facets.HasFacets facets=tabFacets>
            <@facets.Facets 
                facets=tabFacets 
                maxCategories=question.getCurrentProfileConfig().get("stencils.faceted_navigation.max_displayed_categories")!
            />
        </@facets.HasFacets>

        <@curator.HasCuratorOrBestBet position="left">
            <@curator.Curator position="left" />
        </@curator.HasCuratorOrBestBet>

    </div>
    
    <@sessions.SearchHistoryAndShortlist />
</div>

