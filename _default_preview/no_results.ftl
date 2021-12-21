<#--
  Message to display when there are no results
-->
<#macro NoResults>
    <!-- base.NoResults -->
    <#if (response.resultPacket.resultsSummary.totalMatching)!?has_content &&
        response.resultPacket.resultsSummary.totalMatching == 0>
        <!-- base.NoResults -->
        <section class="module-info content-wrapper">
            <figure class="module-info__bg">
                <img src="/s/resources/${question.collection.id}/${question.profile}/css/mysource_files/no-results-icon.svg" alt="">
            </figure>
            <h2 class="module-info__title">No matching results</h2>
            <p class="module-info__desc">
                Your search for <strong><@s.QueryClean /></strong> did not return any results.
            </p>
        </section>
    </#if>
</#macro>
