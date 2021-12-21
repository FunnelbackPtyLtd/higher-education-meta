
<#ftl encoding="utf-8" output_format="HTML" />

<#--
  Display query blending notice
-->
<#macro Blending>
    <!-- base.Blending -->
    <#if (response.resultPacket.QSups)!?size &gt; 0>        
        <blockquote class="search-blending">
        <span class="fas fa-info-circle"></span>
        Your query has been expanded to <strong><#list response.resultPacket.QSups as qsup> ${qsup.query}<#if qsup_has_next>, </#if></#list></strong>.
        &nbsp;Search for <a class="highlight" href="?${QueryString}&amp;qsup=off" title="Turn off query expansion"><em>${question.originalQuery}</em></a> instead.
        </blockquote>
    </#if>
</#macro>


<#macro StoryBook>
    <p class="query-blending">
        <svg class="svg-icon svg-icon--small">
            <use href="#information"></use>
        </svg>Your query has been expanded to <strong>school</strong>. &nbsp;Search for <a class="query-blending__highlight" href="" title="Turn off query expansion">
            <em>schook</em>
        </a> instead.
    </p>
</#macro>