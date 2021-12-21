
<#ftl encoding="utf-8" output_format="HTML" />

<#--
  Display a tier bar
-->
<#macro TierBar result>
    <!-- base.TierBar -->
    <#-- A tier bar -->
    <#if result.matched != result.outOf>
        <h2 class="search-tier text-muted">Results that match ${result.matched} of ${result.outOf} words</h2>
    <#else>
        <h2 class="sr-only search-tier">Fully-matching results</h2>
    </#if>
    <#-- Print event tier bars if they exist -->
    <#if result.eventDate??>
        <h2 class="text-muted search-tier">Events on ${result.eventDate?date}</h2>
    </#if>
</#macro>

<#macro StoryBook>
    <div class="tier-bar">Results that match 1 of 2 words</div>
</#macro>
