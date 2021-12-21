<#ftl encoding="utf-8" output_format="HTML" />

<#--
    Generates a search form for the current collection, passing through the
    relevant parameters like collection, profile, form, scope, ...

    @param preserveTab Boolean indicating if searching via the form should preserve the currently selected tab or not
    @param class Optional <code>class</code> attribute to use on the &lt;form&gt; tag
-->
<#macro SearchForm preserveTab=true class="">
    <!-- hero_banner.SearchForm -->
    <div 
        class="no-wysiwyg hero-banner hero-banner--settings hero-banner--overlay-50 hero-banner--bg-compact hero-banner--undefined hero-banner--pull-centered                            
        hero-banner-search
        ">
        <div class="hero-banner-wrapper">
            <div class="hero-banner__contents-container">
            <div class="hero-banner__contents">
                <div class="hero-banner__contents-text"></div>
                <form class="hero-banner-search__form"
                    action="${question.getCurrentProfileConfig().get("ui.modern.search_link")}" 
                    method="GET"
                    role="search"            
                >

                <input type="hidden" name="collection" value="${question.collection.id}">

                <#-- Output all the parameters which are to persist between queries -->
                <#list ["enc", "form", "scope", "lang", "profile", "userType", "displayMode", "num_ranks"] as parameter>
                    <@s.IfDefCGI name=parameter>
                        <input type="hidden" name="${parameter}" value="${question.inputParameters[parameter]?first!}">
                    </@s.IfDefCGI>
                </#list>

                <#if preserveTab>
                    <#list question.selectedCategoryValues?keys as facetKey>
                        <#if facetKey?starts_with("f.Tabs|")>
                            <#list question.selectedCategoryValues[facetKey] as value>
                                <input type="hidden" name="${facetKey}" value="${value}">
                            </#list>
                        </#if>
                    </#list>
                </#if>

                <div class="hero-banner-search__bar">
                    <label for="bannerQuery" class="visuallyhidden">Search: </label>
                    <div data-component="autocomplete" data-suggest-source="https://stage-stencil-search.clients.funnelback.com/s/suggest.json" data-suggest-collection="higher-education-meta" data-suggest-additional-params="alpha=0.5&amp;profile=_default&amp;show=6&amp;sort=0" data-emphasis="notquery" class="autocomplete-search">
                    <template data-template-id="autocomplete-result">
                        <li id="result-item-" role="option" aria-selected="false" class="autocomplete-search-listbox__item"></li>
                    </template>
                    <template data-template-id="autocomplete-result-query">
                        <span class="autocomplete-search-listbox__query"></span>
                    </template>
                    <div class="autocomplete-search__combobox-wrapper">
                        <div id="autocomplete-search-combobox" role="combobox" aria-controls="autocomplete-search-input" aria-expanded="false" aria-owns="autocomplete-search-listbox" aria-haspopup="listbox" class="autocomplete-search__combobox">
                        <input 
                            id="autocomplete-search-input" 
                            aria-label="Start you search here" 
                            type="text" 
                            aria-autocomplete="list" 
                            aria-controls="autocomplete-search-listbox" 
                            name="query" 
                            placeholder="Start you search here" 
                            autocomplete="off" 
                            class="autocomplete-search__input"
                            value="${question.query!}" 
                        >
                        </div>
                        <ul id="autocomplete-search-listbox" role="listbox" aria-labelledby="autocomplete-search-input" data-active="false" class="autocomplete-search-listbox"></ul>
                        <div data-component="autocomplete-result-status" aria-live="polite" role="status" data-active="false" class="autocomplete-search__status">
                        <span data-component="autocomplete-result-count">0</span> results available.
                        </div>
                    </div>
                    </div>
                    <button type="button" data-click="hero-banner-search-clear" class="hero-banner-search__clear">
                    <svg class="svg-icon svg-icon--large">
                        <title>Close search</title>
                        <use href="#close"></use>
                    </svg>
                    </button>
                </div>
                <button type="submit" class="hero-banner-search__submit">
                    <svg class="svg-icon">
                    <title>Submit search</title>
                    <use href="#search"></use>
                    </svg>
                </button>
                </form>
            </div>
            </div>
            <img 
                src="/s/resources/default~sp-stencils-resources-meta/showcase/images/university_background-02.png" 
                alt="Alt text description" 
                class="hero-banner__image hero-banner__image--top" 
                srcset="/s/resources/default~sp-stencils-resources-meta/showcase/images/university_background-02.png 1600w,
                        /s/resources/default~sp-stencils-resources-meta/showcase/images/university_background-02.png 1000w,
                        /s/resources/default~sp-stencils-resources-meta/showcase/images/university_background-02.png 800w,
                        /s/resources/default~sp-stencils-resources-meta/showcase/images/university_background-02.png 450w"
            >
        </div>
    </div>
</#macro>