<#ftl encoding="utf-8" output_format="HTML" />

<#-- 
    Macro decides how each result should be presented. 

    @param result An individual result fron the data model
    @param view An uppercase string which represents how
        the result should be displayed. Defaults to DETAILED.
-->
<#macro Result result=result view="LIST">
    <#switch view?upper_case>
        <#case "CARD">
            <@CardView result=result />
            <#break>
        <#case "LIST">
            <#-- Determine if results should be hidden or not -->
            <@ListView result=result />
            <#break>
        <#default>
            <@ListView result=result />
    </#switch>
</#macro>

<#--
    Stardard view of a result which is to be displayed in the 
    main section of the search engine result page (SERP)
    @param result An individual result fron the data model
-->
<#macro ListView result>
    <@GenericView result=result />
</#macro>

<#--
    Card view of a result which is to be displayed in the 
    main section of the search engine result page (SERP)
    @param result An individual result fron the data model
-->
<#macro CardView result>
    <@GenericView result=result />
</#macro>

<#--
    A generic view used to drive both the the list and card view
    @param result An individual result fron the data model
-->
<#macro GenericView result>
    <!-- people.GenericView -->
    <article class="search-results__item search-results__item--people" data-fb-result="${result.indexUrl}">
        <figure class="search-results__bg">
            <#if (result.listMetadata["image"]?first)!?has_content>
                <img class="deferred" alt="Thumbnail for ${result.title!}" src="//${httpRequest.getHeader('host')}/stencils/resources/base/v15.8/img/pixel.gif" data-deferred-src="${(result.listMetadata["image"]?first)!}"> 
            <#elseif ((question.getCurrentProfileConfig().get("stencils.showcase"))!"FALSE")?upper_case == "TRUE"> 
                <img alt="Thumbnail for ${result.title!}" src="https://source.unsplash.com/random/160x160?${(result.title)!''?url}">
            </#if>
        </figure>
        <div class="search-results__content">
            <#-- Title -->
            <h3 class="search-results__title">
                <a href="${result.clickTrackingUrl!}" title="${result.liveUrl!}" class="search-results__link">
                    <@s.boldicize>
                        <@s.Truncate length=90>
                            ${(result.listMetadata["peopleFirstName"]?first)!} ${(result.listMetadata["peopleLastName"]?first)!}
                        </@s.Truncate>
                    </@s.boldicize>
                </a>
            </h3>
            
            <#-- Subtitle -->
            <#if (result.listMetadata["peoplePosition"]?first)!?has_content>
                <span class="search-results__sub-title">
                    ${(result.listMetadata["peoplePosition"]?first)!}

                    <#if (result.listMetadata["peoplePosition"]?first)!?has_content>            
                        - ${(result.listMetadata["peopleDepartment"]?first)!}                
                    </#if>
                </span>
            </#if>
            
            <#-- Summary -->
            <p class="search-results__desc">
                <@s.boldicize>
                    ${result.summary!?no_esc}
                </@s.boldicize>
            </p>
            
            <#-- Metadata can be shown as tags -->
            <#--
            <section class="tags">
                <ul class="tags__list">
                    <li class="tags__item">
                        
                    </li>
                </ul>
            </section>  
            -->

            <#-- Call to Action (CTA) -->
            <#--              
            <p>
                <a href="href="${result.clickTrackingUrl!}" class="btn--link">VIEW MORE</a> 
            </p>  
            -->

            <#-- Display the time which this result has last been visited by the user -->
            <@history_cart.LastVisitedLink result=result/>
            
            <#-- Footer -->
            <div class="search-results__bottom">
                <section class="contact js-contact">
                    <ul class="contact__list">                        
                        <#if (result.listMetadata["peopleEmail"]?first)!?has_content>
                           <li class="contact__item">
                                <span class="search-results__icon--red far fa-envelope" aria-label="Email"></span>
                                ${(result.listMetadata["peopleEmail"]?first)!}
                            </li>
                        </#if>                        
                        <#if (result.listMetadata["peoplePhone"]?first)!?has_content>
                            <li class="contact__item">
                                <span class="search-results__icon--red fas fa-phone" aria-label="Phone"></span>
                                ${(result.listMetadata["peoplePhone"]?first)!}
                            </li>
                        </#if>                        
                        <#if (result.listMetadata["peopleLocation"]?first)!?has_content>
                           <li class="contact__item">
                                <span class="search-results__icon--red fas fa-map-marker-alt" aria-label="Location"></span>
                                ${(result.listMetadata["peopleLocation"]?first)!}
                            </li>
                        </#if>                                                
                    </ul>
                </section>
            </div>            
        </div>
    </article>
</#macro>


<#-- 
    Handlebars template used to display the current object
    in concierge.
--> 
<#macro AutoCompleteTemplate>
    <!-- people.AutoCompleteTemplate -->
    <script id="auto-completion-people" type="text/x-handlebars-template">
        <div class="fb-auto-complete--non-organic">
            <h6>
                {{extra.disp.metaData.peopleFirstName}}
                {{extra.disp.metaData.peopleLastName}}
            </h6>
            <div class="details">
                {{#if extra.disp.metaData.peopleDepartment}}
                    <div class="fb-auto-complete__body__metadata">
                        <span class="far fa-building" aria-hidden="true" aria-label="Department" title="Department"></span> 
                        {{extra.disp.metaData.peopleDepartment}}
                    </div>
                {{/if}}

                {{#if extra.disp.metaData.peoplePhone}}
                    <div class="fb-auto-complete__body__metadata">
                        <span class="fas fa-map-marker-alt" aria-hidden="true" aria-label="Phone" title="Phone"></span> 
                        {{extra.disp.metaData.peoplePhone}}
                    </div>
                {{/if}}

                {{#if extra.disp.metaData.peopleEmail}}
                    <div class="fb-auto-complete__body__metadata">
                        <span class="far fa-envelope" aria-hidden="true" aria-label="Email" title="DepartmEmailent"></span> 
                        {{extra.disp.metaData.peopleEmail}}
                    </div>
                {{/if}}
            </div>
        </div>
    </script>
</#macro>