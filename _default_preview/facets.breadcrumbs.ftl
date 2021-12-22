
<#ftl encoding="utf-8" output_format="HTML" />

<#--
    Display the facet bread crumb which describes the 
    facets/filter options that have been selected by the user
--> 
<#macro FacetBreadcrumb>
    <!-- facets.FacetsBreadBox -->
    <#if response.facetExtras.hasSelectedNonTabFacets>
        <section class="filter-list search-results__total clearfix">
            <span class="filter-list__title">Selected filters:</span>
            <ul class="filter-list__list">
                <#list response.facets as facet>
                    <#if facet.selected && facet.guessedDisplayType != "TAB">
                        <#list facet.selectedValues as value>
                            <li class="filter-list__item">
                                <a href="${value.toggleUrl}" title="Remove '${facet.name}: ${value.label}'" class="filter-list__link"><span class="sr-only">Clear filter </span><strong>${facet.name}:</strong> ${value.label}</a>
                            </li>
                        </#list>
                    </#if>
                </#list>
            </ul>
        </section>
    </#if>
</#macro>

<#macro StoryBook>
    <section class="facet-breadcrumb">
        <span class="facet-breadcrumb__label">Selected filters:</span>
        <ul class="facet-breadcrumb__list">
            <li class="facet-breadcrumb__item">
                <a href="www.example.com" title="Remove 'Degree Type: certificate'" class="facet-breadcrumb__link">
                    <svg class="svg-icon svg-icon--expand">
                        <use href="#close"></use>
                    </svg>
                    <span class="sr-only">Clear filter </span>
                    <strong>Degree Type:</strong> certificate </a>
            </li>
            <li class="facet-breadcrumb__item">
                <a href="www.example.com" title="Remove 'Degree Type: certificate'" class="facet-breadcrumb__link">
                    <svg class="svg-icon svg-icon--expand">
                        <use href="#close"></use>
                    </svg>
                    <span class="sr-only">Clear filter </span>
                    <strong>Degree Type:</strong> certificate </a>
            </li>
            <li class="facet-breadcrumb__item">
                <a href="www.example.com" title="Remove 'Degree Type: certificate'" class="facet-breadcrumb__link">
                    <svg class="svg-icon svg-icon--expand">
                        <use href="#close"></use>
                    </svg>
                    <span class="sr-only">Clear filter </span>
                    <strong>Degree Type:</strong> certificate </a>
            </li>
        </ul>
    </section>
</#macro>