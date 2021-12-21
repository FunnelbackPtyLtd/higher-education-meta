
<#ftl encoding="utf-8" output_format="HTML" />

<#--
  Display paging controls
-->
<#macro Paging>
    <!-- base.Paging -->
    <section class="pagination">
        <nav class="pagination__nav" role="navigation" aria-label="Pagination navigation">
            <#-- Previous page -->
            <#if (response.customData.stencils.pagination.previous)??>
                <div class="pagination__item pagination__item-navigation pagination__item-previous">
                    <a class="pagination__link" 
                        rel="prev" 
                        href="${(response.customData.stencils.pagination.previous.url)!}">
                        <span class="sr-only">
                            Go to the
                        </span>
                        <span class="pagination__label">
                            ${(response.customData.stencils.pagination.previous.label)!"Prev"}
                        </span>
                        <span class="sr-only">
                            page
                        </span>
                    </a>
                </div>
            </#if>

            <#-- Sibling pages -->
            <#if (response.customData.stencils.pagination.pages)!?has_content &&
                response.customData.stencils.pagination.pages?size gt 1>
                <ul class="pagination__pages-list">
                    <#list response.customData.stencils.pagination.pages as page>
                        <#if page.selected>
                            <li class="pagination__item pagination__item--active" aria-current="page">
                                <span class="pagination__current">
                                    <span class="pagination__label">${page.label}</span>
                                </span>                            
                            </li>
                        <#else>                    
                            <li class="pagination__item">
                                <a class="pagination__link" href="${page.url}">
                                    <span class="sr-only">
                                        Go to page
                                    </span>
                                    <span class="pagination__label">${page.label}</span>
                                </a>
                            </li>
                        </#if>
                    </#list>
                </ul>
            </#if>

            <#-- Next page -->
            <#if (response.customData.stencils.pagination.next)??>            
                <div class="pagination__item pagination__item-navigation pagination__item-next">
                    <a class="pagination__link" 
                        rel="next" 
                        href="${(response.customData.stencils.pagination.next.url)!}">
                        <span class="sr-only">
                            Go to the
                        </span>
                        <span class="pagination__label">
                            ${(response.customData.stencils.pagination.next.label)!"Next"}
                        </span>
                        <span class="sr-only">
                            page
                        </span>
                    </a>
                </div>
            </#if> 
        </nav>
    </section>
</#macro>

<#macro StoryBook>
    <div>
        <nav class="pagination" role="navigation" aria-label="Pagination navigation">
            <div class="pagination__item pagination__item--previous">
                <a class="pagination__link" rel="prev nofollow" href="#2" aria-label="Goto previous page">
                    <svg aria-hidden="true" class="svg-icon">
                        <use href="#chevron"></use>
                    </svg>
                    <span class="pagination__label">Prev</span>
                </a>
            </div>
            <ul class="pagination__list">
                <li class="pagination__item">
                    <a class="pagination__link" rel="nofollow" href="#1" aria-label="Goto Page 1">
                        <span class="pagination__label">1</span>
                    </a>
                </li>
                <li class="pagination__item">
                    <a class="pagination__link" rel="nofollow" href="#2" aria-label="Goto Page 2">
                        <span class="pagination__label">2</span>
                    </a>
                </li>
                <li class="pagination__item pagination__item--current" aria-current="true">
                    <span class="pagination__link">
                        <span class="pagination__label">
                            <span class="sr-only">Current Page, Page </span>3 </span>
                    </span>
                </li>
                <li class="pagination__item">
                    <a class="pagination__link" rel="nofollow" href="#4" aria-label="Goto Page 4">
                        <span class="pagination__label">4</span>
                    </a>
                </li>
                <li class="pagination__item">
                    <a class="pagination__link" rel="nofollow" href="#5" aria-label="Goto Page 5">
                        <span class="pagination__label">5</span>
                    </a>
                </li>
            </ul>
            <ul class="pagination__list pagination__list--mobile">
                <li class="pagination__item">
                    <a class="pagination__link" rel="nofollow" href="#2" aria-label="Goto Page 2">
                        <span class="pagination__label">2</span>
                    </a>
                </li>
                <li class="pagination__item pagination__item--current" aria-current="true">
                    <span class="pagination__link">
                        <span class="pagination__label">
                            <span class="sr-only">Current Page, Page </span>3 </span>
                    </span>
                </li>
                <li class="pagination__item">
                    <a class="pagination__link" rel="nofollow" href="#4" aria-label="Goto Page 4">
                        <span class="pagination__label">4</span>
                    </a>
                </li>
            </ul>
            <div class="pagination__item pagination__item--next">
                <a class="pagination__link" rel="next nofollow" href="#4" aria-label="Goto next page">
                    <span class="pagination__label">Next</span>
                    <svg aria-hidden="true" class="svg-icon">
                        <use href="#chevron"></use>
                    </svg>
                </a>
            </div>
        </nav>
    </div>
</#macro>
