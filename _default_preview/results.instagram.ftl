<#ftl encoding="utf-8" output_format="HTML" />
<#import "history_cart.ftl" as history_cart />


<#-- 
    Macro decides how each result should be presented. 

    @param result An individual result fron the data model
    @param view An uppercase string which represents how
        the result should be displayed. Defaults to List.
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
    <!-- instagram.GenericView -->
    <article class="search-results__item search-results__item--default" data-fb-result="${(result.indexUrl)!}">
        
        <#if (result.listMetadata["image"]?first)!?has_content>
            <figure class="search-results__bg">
                <img class="deferred" alt="Thumbnail for ${result.title!}" src="//${httpRequest.getHeader('host')}/stencils/resources/base/v15.8/img/pixel.gif" data-deferred-src="${result.listMetadata["image"]?first}"> 
            </figure>  
        <#elseif (result.listMetadata["instagramMediaType"]?first)!?has_content>
            <#-- 
                Attempt to show the media from instagram. Please note that the app configured in the developers API (in facebook) needs to
                have the instagram_graph_user_media enabled which requires an app review.
            -->
            <#switch result.listMetadata["instagramMediaType"]!?first!?upper_case>
                <#case "IMAGE">                
                <#case "CAROUSEL_ALBUM">
                    <#if (result.listMetadata["instagramMediaUrl"]?first)!?has_content>
                        <figure class="">
                            <img class="deferred" alt="Thumbnail for ${result.title!}" src="//${httpRequest.getHeader('host')}/stencils/resources/base/v15.8/img/pixel.gif" data-deferred-src="${result.listMetadata["instagramMediaUrl"]?first}"> 
                        </figure>
                    </#if>  
                    <#break>
                <#case "VIDEO">
                    <#if (result.listMetadata["instagramThumbnailUrl"]?first)!?has_content>
                        <figure class="search-results__bg">
                            <img class="deferred" alt="Thumbnail for ${result.title!}" src="//${httpRequest.getHeader('host')}/stencils/resources/base/v15.8/img/pixel.gif" data-deferred-src="${result.listMetadata["instagramThumbnailUrl"]?first}"> 
                        </figure>
                    </#if>                  
                    <#break>
                <#default>
                    <#-- Do nothing in the default case -->
                    <#break>                            
            </#switch>
        <#elseif ((question.getCurrentProfileConfig().get("stencils.showcase"))!"FALSE")?upper_case == "TRUE">
            <figure class="search-results__bg">
                <img alt="Thumbnail for ${result.title!}" src="https://source.unsplash.com/random/160x160?${(result.title)!''?url}">
            </figure>
        </#if>
        <div class="search-results__content">
            <#-- Title -->
             <#if (result.listMetadata["author"]?first)!?has_content>
                <h3 class="search-results__title">
                    ${(result.listMetadata["author"]?first)!"Unknown"}
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
            </#if>
            
            <#-- Pretty version of the url of the document -->
            <#--  
            <cite>
                <@s.Truncate length=90>
                    ${(result.displayUrl)!}
                </@s.Truncate>                
            </cite>  
            -->

            <#-- Subtitle -->
            <span class="search-results__sub-title">
                <time datetime="${result.date?date?string.iso}" title="${result.date?date?string.medium}">
                    ${prettyTime(result.date?date)}
                </time> via 
                <span class="fab fa-instagram" aria-hidden="true"></span>                                 
                instagram
            </span>

            <#-- Summary -->
            <#if (result.listMetadata["instagramCaption"]?first)!?has_content>
                <p class="search-results__desc">
                    <@s.boldicize>                    
                        ${(result.listMetadata["instagramCaption"]?first)!}
                    </@s.boldicize>
                </p>
            </#if>                

            <#-- Metadata can be shown as tags -->
            <#--  
            <section class="tags">
                <ul class="tags__list">
                    <li class="tags__item">
                        Lorem
                    </li>
                    <li class="tags__item">
                        Lorem ipsum
                    </li>
                </ul>
            </section>  
            -->

            <#-- Call to Action (CTA) -->                        
            <p>
                <a href="${result.clickTrackingUrl!}" class="btn--link" aria-label="View post on instagram">VIEW POST</a> 
            </p>  
          

            <#-- Display the time which this result has last been visited by the user -->
            <@history_cart.LastVisitedLink result=result/> 

            <#-- Footer -->
            
            <div class="search-results__bottom">
                <section class="contact js-contact">
                    <ul class="contact__list">                        
                        <#if (result.listMetadata["instagramLikesCount"]?first)!?has_content>                    
                            <li class="contact__item" title="Duration of video">
                                <span class="search-results__icon--red far fa-eye" aria-label="Number of views"></span>
                                ${(result.listMetadata["instagramLikesCount"]?first)!}
                            </li>
                        </#if>
                        <#if (result.listMetadata["instagramCommentsCount"]?first)!?has_content>                    
                            <li class="contact__item" title="Duration of video">
                                <span class="search-results__icon--red far fa-comment" aria-label="Number of comments"></span>
                                ${(result.listMetadata["instagramCommentsCount"]?first)!}
                            </li>
                        </#if>
                    </ul>
                </section>
            </div>                                            
        </div>
    </article>
</#macro>