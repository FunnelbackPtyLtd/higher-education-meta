<#ftl encoding="utf-8" output_format="HTML" />
<#-- 
    This file contains the project specific implementation for individual sections
    of the Search Engine Results Page (SERP). Sections include things such as 
    search form, results section, facets and tabs. More often than not,
    this will involve calling macros from other libraries with specific parameters. 
-->

<#macro SearchForm>
    <!-- project.SearchForm -->
    <section class="module-search js-module-search content-wrapper module-search--bg" style="background-image: url('//${httpRequest.getHeader('host')}/s/resources/${question.collection.id}/${question.profile}/css/mysource_files/bg-search.png');">
        <h1 class="sr-only">Search module</h1>
        <@base.SearchForm>
            <div class="module-search__group">
                <label id="fb-query"for="query" class="sr-only">Search</label>                
                <input required 
                    name="query" 
                    id="query" 
                    type="Search query" 
                    autofocus 
                    class="module-search__query tt-input" 
                    autocomplete="off" 
                    placeholder="Start your search here…" 
                    value="${question.query!}" 
                    spellcheck="false" 
                    dir="auto"
                    aria-labelledby="fb-query"
                    aria-required="true">

                <button type="submit" class="module-search__btn"><span class="sr-only">Search</span></button>                

                <@history_cart.Controls />
            </div>
        </@base.SearchForm>
    </section>
</#macro>

<#macro Tabs>
    <@tabs.Tabs tabs=["Tabs"] />
</#macro>

<#-- Outputs the search result section -->
<#--  <#macro Results>
    <@base.ResultList nestedRank=3>            
        <@fb.ExtraResults name="twitter">
            <li><h4 class="sr-only">Tweet results</h4></li>
            <li class="search-results-twitter">
                <div class="row mb-3">
                    <#list (response.resultPacket.results)![] as result>
                        <#if result?index lt 3>
                            <div class="col-md-4">
                                <@twitter.TwitterCard result=result />
                            </div>
                        </#if>
                    </#list>
                </div>
            </li>
        </@fb.ExtraResults>
    </@base.ResultList>
</#macro>  -->

<#-- 
    Display the results with the ability to browse 
    We want different markup here compared to the standard results.
    e.g. Additional tab at the top
-->
