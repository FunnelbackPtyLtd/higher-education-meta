<#-- Obtain the result mode from the CGI paramters; Valid values are LIST and CARD -->
<#function getDisplayMode question>
    <#-- Default the display mode to "list" -->
    <#assign displayMode = ""> 

    <#-- Get the mode that is currently configured -->
    <#if (question.inputParameters["displayMode"]?first)!?has_content>
        <#-- Get the value from the user's selection -->
        <#assign displayMode = question.inputParameters["displayMode"]?first!?upper_case>
    <#elseif (question.getCurrentProfileConfig().get("stencils.results.display_mode"))!?has_content>
        <#-- Get the value from profile config -->
        <#assign displayMode = question.getCurrentProfileConfig().get("stencils.results.display_mode")!?upper_case>
    <#else>
        <#-- Default -->
        <#assign displayMode = "LIST"> 
    </#if>

    <#return displayMode>
</#function>

<#--
    Runs the best code when the specified display mode is selected.
-->
<#macro IsDisplayMode mode="LIST">
    <#if getDisplayMode(question) == mode!?upper_case>
        <#nested> 
    </#if>
</#macro>

<#--
    Show the various display mode options to the user
-->
<#macro DisplayMode>
    <!-- base.displayMode -->
    <a href='${question.getCurrentProfileConfig().get("ui.modern.search_link")}?${removeParam(QueryString, "displayMode")}&displayMode=card' 
        class="search-results__icon search-results__icon--box <#if getDisplayMode(question)! == 'CARD'>active</#if>"
        title="Display results as cards">
        <span class="sr-only">Card view</span>
    </a>
    <a href='${question.getCurrentProfileConfig().get("ui.modern.search_link")}?${removeParam(QueryString, "displayMode")}&displayMode=list' 
        class="search-results__icon search-results__icon--list <#if getDisplayMode(question)! == 'LIST'>active</#if>"
        title="Display results as a list">
        <span class="sr-only">List view</span>
    </a>
</#macro>

<#-- 
    Generate the HTML for advanced features which control the search results such as 
    sorting and number of results to display
-->
<#macro SearchTools>
    <div class="search-results__tools clearfix">
        <@base.Counts /> 
        <div class="search-results__tools-right">
            <@facets.ClearAllFacets />            
            <@base.LimitDropdown />
            <@base.SortDropdown />
            <@base.DisplayMode />                    
        </div>
    </div>
</#macro>

<#--
  Generate an HTML drop-down for sorting results

  @param options Map of sort options, where keys are the `sort` paratmeter (e.g. `date`) and values the label (e.g. `Date (Newest first)`)
-->
<#macro SortDropdown id="fb-sort-dropdown" options={
  "": "Relevance",
  "date": "Date (Newest first)",
  "adate": "Date (Oldest first)",
  "title": "Title (A-Z)",
  "dtitle": "Title (Z-A)",
  "prox": "Distance",
  "url": "URL (A-Z)",
  "durl": "URL (Z-A)",
  "shuffle": "Shuffle"} >
    <!-- base.SortDropdown -->
    <section class="dropdown-list ${id}">
        <span id=${id} class="sr-only">
            Sort results by
        </span>
        <button class="dropdown-list__link js-dropdown-list__link" aria-haspopup="listbox" aria-expanded="false">
            <span>${(options[question.inputParameters["sort"]?first])!"Sort by"}</span>
        </button>
        <ul class="dropdown-list__list" 
            role="listbox" 
            tabindex="-1"
            aria-labelledby=${id}>
            <#list options as key, value>
                <#if ((options[question.inputParameters["sort"]?first])!"") == value>
                    <li role="option" aria-selected="true">                
                        <a class="dropdown-list__list-link" title="Sort by ${value}" href="${question.collection.configuration.value("ui.modern.search_link")}?${removeParam(QueryString, "sort")}&sort=${key}">
                                <i class="fas fa-check"></i>
                            ${value}
                        </a>
                    </li>
                <#else>
                    <li role="option" aria-selected="false">                
                        <a class="dropdown-list__list-link" title="Sort by ${value}" href="${question.collection.configuration.value("ui.modern.search_link")}?${removeParam(QueryString, "sort")}&sort=${key}">
                            ${value}
                        </a>
                    </li>                                
                </#if>
            </#list>
        </ul>
    </section>
</#macro>

<#--
  Generate an HTML drop-down to control the number of results

  @param limits Array of number of results to provide (defaults to 10, 20, 50)
-->
<#macro LimitDropdown id="fb-limit-dropdown" limits=[10, 20, 50]>
    <!-- base.LimitDropdown -->
    <section class="dropdown-list ${id}">
        <span id=${id} class="sr-only">
            Limit the number of results to display
        </span>    
        <button class="dropdown-list__link js-dropdown-list__link" aria-haspopup="listbox" aria-expanded="false">
            <span>${question.inputParameters["num_ranks"]?first!"10"}</span>
        </button>
        <ul class="dropdown-list__list" 
            role="listbox" tabindex="-1"
            aria-labelledby=${id}>
            <#list limits as limit>
                <#if ((question.inputParameters["num_ranks"]?first?number)!0) == limit>
                    <#-- Selected case -->
                    <li role="option" aria-selected="true">
                        <a class="dropdown-list__list-link" title="Limit to ${limit} results" href="${question.collection.configuration.value("ui.modern.search_link")}?${removeParam(QueryString, "num_ranks")}&num_ranks=${limit}">
                            <i class="fas fa-check"></i>
                            ${limit} results
                        </a>
                    </li>
                <#else>
                    <#-- Unselected case -->
                    <li role="option" aria-selected="false">
                        <a class="dropdown-list__list-link" title="Limit to ${limit} results" href="${question.collection.configuration.value("ui.modern.search_link")}?${removeParam(QueryString, "num_ranks")}&num_ranks=${limit}">
                            ${limit} results
                        </a>
                    </li>
                </#if>
            </#list>
        </ul>
    </section>
</#macro>


<#macro StoryBook>
    <div class="stencils-summary-and-search-tools">
        <p>1 - 10 of 2,189 search results for science</p>
        <form action="search.html" method="get" class="search-tools form custom-form custom-form--bg-white custom-form--color-black" data-pnp-component="stencils-search-tools">
            <input class="search-tools__query" name="query" id="search-tool_query" type="hidden">
            <div class="sq-form-question sq-form-question-select">
                <label class="sq-form-question-title sr-only" for="search-tools__results-per-page">Results per page:</label>
                <div class="sq-form-question-answer">
                    <select name="search-tools__results-per-page" class="sq-form-field" id="search-tools__results-per-page">
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </select>
                </div>
            </div>
            <div class="sq-form-question sq-form-question-select">
                <label class="search-tools__label sr-only" for="search-tools__sort">Sort By:</label>
                <div class="sq-form-question-answer">
                    <select name="search-tools__sort" class="sq-form-field search-tools__select" id="search-tools__sort">
                        <option value="rel">Relevance</option>
                        <option value="date">Date (Newest first)</option>
                        <option value="adate">Date (Oldest first)</option>
                        <option value="title">Title (A-Z)</option>
                        <option value="dtitle">Title (Z-A)</option>
                        <option value="url">URL (A-Z)</option>
                    </select>
                </div>
            </div>
            <div class="search-tools__button-group">
                <a class="search-tools__button search-tools__button--inactive" href="#" title="grid view">
                    <svg class="svg-icon svg-icon--xlarge">
                        <use href="#grid-view"></use>
                    </svg>
                </a>
                <a class="search-tools__button" title="list view" href="#">
                    <svg class="svg-icon svg-icon--xlarge">
                        <use href="#list-view"></use>
                    </svg>
                </a>
            </div>
            <button type="submit" class="sr-only">Submit</button>
        </form>
    </div>
</#macro>