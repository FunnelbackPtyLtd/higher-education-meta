<#ftl encoding="utf-8" output_format="HTML" />

<#--
    Generates a search form for the current collection, passing through the
    relevant parameters like collection, profile, form, scope, ...

    @param preserveTab Boolean indicating if searching via the form should preserve the currently selected tab or not
    @param class Optional <code>class</code> attribute to use on the &lt;form&gt; tag
-->
<#macro SearchForm preserveTab=true class="">
    <!-- hero_banner:SearchForm -->
    <div
        class="no-wysiwyg hero-banner hero-banner--settings hero-banner--overlay-50 hero-banner--bg-compact hero-banner--undefined hero-banner--pull-centered hero-banner-search"
    >
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

                        <@base.inputsForForms allowList= ["enc", "form", "scope", "lang", "profile", "userType", "displayMode", "num_ranks"] />

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
                            <label for="bannerQuery" class="visuallyhidden">
                            Search:
                            </label>
                            <div
                                class="autocomplete-search"
                                >
                                <div class="autocomplete-search__combobox-wrapper">
                                    <div
                                        id="autocomplete-search-combobox"
                                        role="combobox"
                                        aria-controls="autocomplete-search-input"
                                        aria-expanded="false"
                                        aria-owns="autocomplete-search-listbox"
                                        aria-haspopup="listbox"
                                        class="autocomplete-search__combobox"
                                    >
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
                                        />
                                    </div>
                                </div>
                            </div>
                            <button
                                type="button"
                                data-click="hero-banner-search-clear"
                                class="hero-banner-search__clear"
                                >
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
                        <#-- Concierge currently also contains the logic and markup for the input box -->
                        <@concierge.Concierge />	                    
                        <@sessions.Controls />                
                </div>
            </div>
            <img 
                src="/s/resources/pnp~sp-stencils-resources-meta/showcase/images/university_background-02.png" 
                alt="Alt text description" 
                class="hero-banner__image hero-banner__image--top" 
                srcset="/s/resources/pnp~sp-stencils-resources-meta/showcase/images/university_background-02.png 1600w,
                        /s/resources/pnp~sp-stencils-resources-meta/showcase/images/university_background-02.png 1000w,
                        /s/resources/pnp~sp-stencils-resources-meta/showcase/images/university_background-02.png 800w,
                        /s/resources/pnp~sp-stencils-resources-meta/showcase/images/university_background-02.png 450w"
            >
        </div>
    </div>
</#macro>
