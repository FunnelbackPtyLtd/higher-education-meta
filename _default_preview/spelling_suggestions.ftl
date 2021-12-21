<#--
  Display spelling suggestion notice
-->
<#macro Spelling>
    <!-- base.Spelling -->
    <#if (response.resultPacket.spell)??>
        <blockquote class="search-spelling">
            Did you mean <em><a class="highlight" href="${question.collection.configuration.value("ui.modern.search_link")}?${response.resultPacket.spell.url}" title="Spelling suggestion">${(response.resultPacket.spell.text)!}</a></em>?
        </blockquote>
    </#if>
</#macro>
