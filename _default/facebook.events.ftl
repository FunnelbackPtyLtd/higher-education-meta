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
    <!-- facebook.events.GenericView -->
    <article class="search-results__item search-results__item--event" data-fb-result="${result.indexUrl}">
        <figure class="search-results__bg">
            <#if (result.listMetadata["image"]?first)!?has_content>
                <img class="deferred" alt="Thumbnail for ${result.title!}" src="//${httpRequest.getHeader('host')}/stencils/resources/base/v15.8/img/pixel.gif" data-deferred-src="${(result.listMetadata["image"]?first)!}"> 
            <#elseif ((question.getCurrentProfileConfig().get("stencils.showcase"))!"FALSE")?upper_case == "TRUE"> 
                <img alt="Thumbnail for ${result.title!}" src="https://source.unsplash.com/random/160x160?${(result.title)!''?url}"> 
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
                <a href="${(result.clickTrackingUrl)!}" title="${result.liveUrl!}" class="search-results__link">
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
            <#if (result.listMetadata["stencilsFacebookEventLocation"]?first)!?has_content>
                <span class="search-results__sub-title">
                    <span class="search-results__icon--red fas fa-map-marker-alt" title="Event location"></span>
                    <a class="text-muted" href="https://maps.google.com/?q=${(result.listMetadata["stencilsFacebookEventCoordinates"]?first)!(result.listMetadata["stencilsFacebookEventLocation"])!}" target="_blank">${(result.listMetadata["stencilsFacebookEventLocation"])!}</a>              
                </span>
            </#if>

            <#if (result.listMetadata["stencilsFacebookProfileUrl"]?first)!?has_content>
                <span class="search-results__sub-title">
                    <a href="${(result.listMetadata["stencilsFacebookProfileUrl"]?first)!}">       
                        ${(result.listMetadata["author"]?first)!"Unknown author"}
                    </a>
                </span>
            </#if>               
            
            <#-- Summary -->
            <#if (result.listMetadata["c"]?first)!?has_content>            
                <p class="search-results__desc">
                    <@s.boldicize>                    
                        ${(result.listMetadata["c"]?first)!}
                    </@s.boldicize>
                </p>
            </#if>                

            <#-- Tags -->
            <section class="tags">
                <ul class="tags__list">
                    <#if (result.listMetadata["courseDepartment"]?first)!?has_content>
                        <li class="tags__item">
                            <@s.boldicize>                    
                                ${(result.listMetadata["courseDepartment"]?first)!}
                            </@s.boldicize>
                        </li>
                    </#if>                   
                    <#if (result.listMetadata["courseDelivery"]?first)!?has_content>
                        <li class="tags__item">
                            <@s.boldicize>                    
                                ${(result.listMetadata["courseDelivery"]?first)!}
                            </@s.boldicize>
                        </li>
                    </#if>                   
                    <#if (result.listMetadata["courseCredit"]?first)!?has_content>
                        <li class="tags__item">
                            <@s.boldicize>                    
                                ${(result.listMetadata["courseCredit"]?first)!}
                            </@s.boldicize>
                            credits
                        </li>
                    </#if>                   
                </ul>
            </section>

            <#-- Call to Action (CTA) -->
            <p>
                <a href="${result.clickTrackingUrl!}" class="btn--link" aria-label="Find out more about ${(result.title)!}">
                    FIND OUT MORE
                </a> 
            </p>

            <#-- Display the time which this result has last been visited by the user -->
            <@history_cart.LastVisitedLink result=result/>

            <#-- Footer -->
            <div class="search-results__bottom">
                <section class="contact js-contact">
                    <ul class="contact__list">                        
                        <#-- Author -->
                        <#if (result.listMetadata["stencilsFacebookProfileUrl"]?first)!?has_content>
                           <li class="contact__item">                                
                                By:
                                <a class="highlight" href="${result.customData["stencilsFacebookProfileUrl"]!}">
                                    ${(result.listMetadata["author"]?first)!}
                                </a>                                                                 
                            </li>
                        </#if>                        

                        <#-- Event date -->                        
                        <#if (result.listMetadata["d"]?first)!?has_content>
                            <li class="contact__item">
                                <span class="search-results__icon--red far fa-clock" title="Event start and end time"></span>
                                ${(result.listMetadata["d"]?first?datetime("yyyy-MM-dd HH:mm:ss.S z")?time?string.short)!} 
                                
                                <#if (result.listMetadata["stencilsFacebookEventEndDateTime"]?first)!?has_content>
                                    - ${(result.listMetadata["stencilsFacebookEventEndDateTime"]?first?datetime("yyyy-MM-dd HH:mm:ss.S z")?time?string.short)!}
                                </#if>
                            </li>
                        <#else>
                            <li class="contact__item">
                                <span class="search-results__icon--red far fa-clock" title="Event start and end time"></span>
                                Not available
                            </li>
                        </#if>
                    </ul>
                </section>
            </div>            
        </div>
    </article>
</#macro>
<#-- vim: set expandtab ts=2 sw=2 sts=2 :-->