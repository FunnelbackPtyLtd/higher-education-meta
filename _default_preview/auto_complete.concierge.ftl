<#ftl encoding="utf-8" output_format="HTML" />
<#-- 
    This template contains markup and logic related to the 
    concierge feature.
-->

<#macro Concierge>
    <div
        id="autocomplete"
        data-component="autocomplete-concierge"
        data-autocmplete-config="{&quot;placeholder&quot;:&quot;Sample text&quot;,&quot;action&quot;:&quot;search.html&quot;}"
    >
        <input type="hidden" name="collection" value="${question.collection.id}">
        <@base.inputsForForms allowList= ["enc", "form", "scope", "lang", "profile", "userType", "displayMode", "num_ranks"] />

        <span class="custom__classname"
              data-id="test_1"
              data-service-url="https://stage-stencil-search.clients.funnelback.com/s/suggest.json"
              data-params="alpha=0.5&profile=auto-completion&show=5&collection=higher-education-meta"
              data-template="Organic"
              data-label="Suggestions"
        > </span>

        <span class="custom__classname"
              data-id="test_2"
              data-service-url="https://stage-stencil-search.clients.funnelback.com/s/suggest.json"
              data-params="fmt=json%2B%2B&alpha=0.5&profile=auto-completion&show=5&sort=0&collection=higher-education-people"
              data-template="People"
              data-label="People"
        > </span>

        <span class="custom__classname custom__classname2"
              data-id="test_3"
              data-service-url="https://stage-stencil-search.clients.funnelback.com/s/suggest.json"
              data-params="fmt=json%2B%2B&alpha=0.5&profile=auto-completion&show=5&sort=0&collection=higher-education-programs"
              data-template="Programs"
              data-label="Programs"
        > </span>
    </div>
</#macro>