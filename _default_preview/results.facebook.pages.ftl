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
    <!-- facebook.pages.GenericView -->
    <article class="search-results__item search-results__item--default" data-fb-result="${result.indexUrl}">
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
            <#if (result.listMetadata["stencilsFacebookPageCity"]?first)!?has_content>
                <span class="search-results__sub-title">
                    ${(result.listMetadata["stencilsFacebookPageCity"]?first)!}       
                    <#if (result.listMetadata["stencilsFacebookPageCountry"]?first)!?has_content>
                        , ${(result.listMetadata["stencilsFacebookPageCountry"]?first)!}
                    </#if>                                  
                </span>
            </#if>               
            
            <#-- Summary -->
            <p class="search-results__desc">
                <@s.boldicize>
                    ${(response.customData.stencilsMethods.linkify(result.listMetadata["c"]?first!))!?no_esc}
                </@s.boldicize>
            </p>
            <p class="search-results__desc">
                <span class="fas fa-info-circle"></span>
                <@s.boldicize>
                    ${(response.customData.stencilsMethods.linkify(result.listMetadata["stencilsFacebookPageInfo"]?first!))!?no_esc}
                </@s.boldicize>
            </p>

            <#-- Metadata can be shown as tags -->
            <#--  
            <section class="tags">
                <ul class="tags__list">
                    <li class="tags__item">
                    </li>
                    <li class="tags__item">
                    </li>
               </ul>
            </section>  
            -->

            <#-- Call to Action (CTA) -->
            <p>
                <a href="href="${result.clickTrackingUrl!}" class="btn--link">VIEW MORE</a> 
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
                        <#if (result.listMetadata["stencilsFacebookPageWebsite"]?first)!?has_content>
                            <li class="contact__item ">
                                <span class="search-results__icon--red fas fa-globe" aria-label="Facebook page" title="Facebook page"></span>                                 
                                <a class="highlight" href="tel:${(result.listMetadata["stencilsFacebookPageWebsite"]?first)!}">
                                    ${(result.listMetadata["stencilsFacebookPageWebsite"]?first)!}
                                </a>                                                        
                            </li>
                        </#if>
                        <#if (result.listMetadata["stencilsFacebookPagePhone"]?first)!?has_content>
                           <li class="contact__item">
                                <span class="search-results__icon--red fas fa-phone" title="Contact details"></span>
                                <a class="text-muted" href="tel:${(result.listMetadata["stencilsFacebookPagePhone"]?first)!}">
                                    ${result.listMetadata["stencilsFacebookPagePhone"]?first!}
                                </a>                                
                            </li>
                        </#if>
                    </ul>
                </section>
            </div>            
        </div>
    </article>
</#macro>

<#-- vim: set expandtab ts=2 sw=2 sts=2 :-->