<#ftl encoding="utf-8" output_format="HTML" />
<#-- 
  This template contains markup and logic related to the 
  auto complete feature.
-->

<#-- 
    Displays the next code if contextual navigation has at least 1 entry 
-->
<#macro HasContextualNavigation>
    <#if (response.resultPacket.contextualNavigation.categories)!?has_content &&
        response.resultPacket.contextualNavigation.categories?filter(category -> category.clusters?size gt 0)?size gt 0>
        <#nested>
    </#if>
</#macro>

<#--
  Display the contextual navigation panel only if there are valid values
-->
<#macro ContextualNavigation>
    <!-- contextual_navigation.ContextNavigation -->
    <@HasContextualNavigation>
        <!-- base.ContextualNavigation -->
        <section class="related-links">
            <h2 class="related-links__title">
                Related searches for <strong><@s.QueryClean /></strong>
            </h2>
            <ul class="related-links__list">
                <#list (response.resultPacket.contextualNavigation.categories)![] as category>
                        <#list category.clusters as cluster>
                            <li class="related-links__item">
                                <a href="${cluster.href}" class="related-links__link">
                                    ${cluster.label?replace("...", " <strong>${response.resultPacket.contextualNavigation.searchTerm} </strong> ")?no_esc}
                                </a>
                            </li>
                        </#list>
                </#list>
            </ul>
        </section>
    </@HasContextualNavigation>
</#macro>

<#macro StoryBook>
    <section class="related-links">
        <h2 class="related-links__heading">Related searches for <strong>science</strong>
        </h2>
        <ul class="related-links__list">
            <li class="related-links__item">
                <a href="?clicked_fluster=social+science&amp;cluster0=science&amp;query=%60Social+Science%60&amp;collection=higher-education-meta" class="related-links__link">Social <strong>science</strong>
                </a>
            </li>
            <li class="related-links__item">
                <a href="?clicked_fluster=computer+science&amp;cluster0=science&amp;query=%60Computer+Science%60&amp;collection=higher-education-meta" class="related-links__link">Computer <strong>science</strong>
                </a>
            </li>
            <li class="related-links__item">
                <a href="?clicked_fluster=veterinary+science&amp;cluster0=science&amp;query=%60Veterinary+Science%60&amp;collection=higher-education-meta" class="related-links__link">Veterinary <strong>science</strong>
                </a>
            </li>
            <li class="related-links__item">
                <a href="?clicked_fluster=computing+science&amp;cluster0=science&amp;query=%60Computing+Science%60&amp;collection=higher-education-meta" class="related-links__link">Computing <strong>science</strong>
                </a>
            </li>
            <li class="related-links__item">
                <a href="?clicked_fluster=lunchbox+science&amp;cluster0=science&amp;query=%60Lunchbox+Science%60&amp;collection=higher-education-meta" class="related-links__link">Lunchbox <strong>science</strong>
                </a>
            </li>
            <li class="related-links__item">
                <a href="?clicked_fluster=faculty+of+science&amp;cluster0=science&amp;query=%60Faculty+of+Science%60&amp;collection=higher-education-meta" class="related-links__link">Faculty of <strong>science</strong>
                </a>
            </li>
            <li class="related-links__item">
                <a href="?clicked_fluster=science+courses&amp;cluster0=science&amp;query=%60Science+courses%60&amp;collection=higher-education-meta" class="related-links__link">
                    <strong>science</strong> Courses </a>
            </li>
            <li class="related-links__item">
                <a href="?clicked_fluster=foundations+of+science&amp;cluster0=science&amp;query=%60Foundations+of+Science%60&amp;collection=higher-education-meta" class="related-links__link">Foundations of <strong>science</strong>
                </a>
            </li>
            <li class="related-links__item">
                <a href="?clicked_fluster=school+of+science&amp;cluster0=science&amp;query=%60School+of+Science%60&amp;collection=higher-education-meta" class="related-links__link">School of <strong>science </strong>
                </a>
            </li>
            <li class="related-links__item">
                <a href="?clicked_fluster=science+and+technology&amp;cluster0=science&amp;query=%60science+and+technology%60&amp;collection=higher-education-meta" class="related-links__link">
                    <strong>science</strong> and Technology </a>
            </li>
        </ul>
    </section>
</#macro>