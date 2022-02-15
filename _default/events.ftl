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
    <!-- events.GenericView -->
    <article class="search-results__item search-results__item--event" data-fb-result="${result.indexUrl}">
        <figure class="search-results__bg">
            <#if (result.listMetadata["image"]?first)!?has_content>
                <img class="deferred" alt="Thumbnail for ${result.title!}" src="//${httpRequest.getHeader('host')}/stencils/resources/base/v15.8/img/pixel.gif" data-deferred-src="${result.listMetadata["image"]?first}"> 
            <#elseif ((question.getCurrentProfileConfig().get("stencils.showcase"))!"FALSE")?upper_case == "TRUE"> 
                <img alt="Thumbnail for ${result.title!}" src="https://picsum.photos/300/300?sig=${(result.title)!''?url}">
            </#if>
        </figure>

        <time class="search-results__time" datetime="${(result.date?string("mm"))!}-${(result.date?string("dd")!)!}">
            <span class="search-results__month">                  
                ${(result.date?string("MMM"))!}
            </span>
            <span class="search-results__day">
                ${(result.date?string("dd")!N/A)!}                         
            </span>
        </time>        
        <div class="search-results__content">
            <#-- Title -->
            <h3 class="search-results__title">
                <a href="${result.clickTrackingUrl!}" title="${result.liveUrl!}" class="search-results__link">
                    <@s.boldicize>
                        <@s.Truncate length=90>
                            ${(result.title)!}
                        </@s.Truncate>
                    </@s.boldicize>
                </a>
                <#-- 
                    Adds a control so that users can add this to the cart
                    Note: Ensure that you review the cart templates if
                    you enable this feature.
                -->
                <#--  
                <span class="enable-cart-on-result float-right"
                    aria-label="Add result to the shortlist">
                </span>  
                -->                
            </h3>
            
            <#-- Subtitle -->
            <#if (result.listMetadata["eventLocation"]?first)!?has_content>
                <span class="search-results__sub-title">
                    <span class="search-results__icon--red fas fa-map-marker-alt" title="Event location"></span>
                    ${(result.listMetadata["eventLocation"]?first)!}              
                </span>
            </#if>
            
            <#-- Summary -->
            <p class="search-results__desc">
                <@s.boldicize>
                    ${result.summary!?no_esc}
                </@s.boldicize>
            </p>

            <#-- Metadata can be shown as tags -->
            <section class="tags">
                <ul class="tags__list">
                    <#list (result.listMetadata["eventCategory"])![] as category>
                        <li class="tags__item">
                            ${category!}
                        </li>
                    </#list>
                </ul>
            </section>

            <#-- Call to Action (CTA) -->
            <p>
                <a href="#" class="btn--link" 
                    aria-label="Click to sign up to ${(result.title)!}"
                    title="Click to sign up to ${(result.title)!}">
                    Sign up
                </a> 
            </p>

            <#-- Call to Action (CTA) -->
            <@history_cart.LastVisitedLink result=result/>
            
            <#-- Footer -->
            <div class="search-results__bottom">
                <section class="contact js-contact">
                    <ul class="contact__list">                        
                        <#if (result.listMetadata["eventStartTime"]?first)!?has_content &&
                            (result.listMetadata["eventEndTime"]?first)!?has_content>
                            <li class="contact__item">
                                <span class="search-results__icon--red far fa-clock" title="Event start and end time" aria-label="Event start and end time"></span>
                                ${(result.listMetadata["eventStartTime"]?first)!} - ${(result.listMetadata["eventEndTime"]?first)!}
                            </li>
                        <#else>
                            <li class="contact__item">
                                <span class="search-results__icon--red far fa-clock" title="Event start and end time" aria-label="Event start and end time"></span>
                                Not available
                            </li>
                        </#if>
                        <#if (result.listMetadata["eventContactEmail"]?first)!?has_content>
                           <li class="contact__item">
                                <span class="search-results__icon--red far fa-envelope" title="Event e-mail" aria-label="Event e-mail"></span>
                                <a class="highlight" href="mailto:${(result.listMetadata["eventContactEmail"]?first)!}">
                                    ${(result.listMetadata["eventContactEmail"]?first)!}</a>                               
                                </a>
                            </li>
                        </#if>                                                
                        <#if (result.listMetadata["eventContactPhone"]?first)!?has_content>
                           <li class="contact__item">
                                <span class="search-results__icon--red fas fa-phone" title="Event phone number" aria-label="Event phone number"></span>
                                <a class="highlight" href="tel:${(result.listMetadata["eventContactPhone"]?first)!}">
                                    ${result.listMetadata["eventContactPhone"]?first!}
                                </a>                                
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
    <!-- events.AutoCompleteTemplate -->
    <script id="auto-completion-events" type="text/x-handlebars-template">
        <div class="fb-auto-complete--non-organic">
            <h6>
                {{extra.disp.title}}
            </h6>

            <div class="details">
                {{#if extra.disp.listMetadata.eventLocation[0]}}
                    <div class="fb-auto-complete__body__metadata">
                        <span class="fas fa-map-marker-alt" aria-hidden="true" aria-label="Event location" title="Event location"></span> 
                        {{extra.disp.listMetadata.eventLocation[0]}}
                    </div>
                {{/if}}
                {{#if extra.disp.listMetadata.eventContactPhone[0]}}
                    <div class="fb-auto-complete__body__metadata">
                        <span class="fas fa-map-marker-alt" aria-hidden="true" aria-label="Event phone number" title="Event phone number"></span> 
                        {{extra.disp.listMetadata.eventContactPhone[0]}}
                    </div>
                {{/if}}
                {{#if extra.disp.listMetadata.eventContactEmail[0]}}
                    <div class="fb-auto-complete__body__metadata">
                        <span class="far fa-envelope" aria-hidden="true" aria-label="Event email" title="email"></span> 
                        {{extra.disp.listMetadata.eventContactEmail[0]}}
                    </div>
                {{/if}}
            </div>      
		</div>
    </script>
</#macro>

<#-- vim: set expandtab ts=2 sw=2 sts=2 :-->
