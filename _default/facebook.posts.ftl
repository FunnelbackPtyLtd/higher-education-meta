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
    <article class="search-results__item search-results__item search-results__item--default search-results__item__facebook-post " data-fb-result="${result.indexUrl}">
        <div class="search-results__content">
            <#-- Title -->
            <h3 class="search-results__title">
                <figure class="facebook-post__profile-thumbnail">
                    <#if (result.customData["stencilsFacebookProfileUrl"])!?has_content>
                        <img class="deferred" alt="Thumbnail for ${result.title!}" src="//${httpRequest.getHeader('host')}/stencils/resources/base/v15.8/img/pixel.gif" data-deferred-src="${(result.customData["stencilsFacebookProfileUrl"])!}"> 
                    <#elseif ((question.getCurrentProfileConfig().get("stencils.showcase"))!"FALSE")?upper_case == "TRUE"> 
                        <img alt="Thumbnail for ${result.title!}" src="https://source.unsplash.com/random/160x160?${(result.title)!''?url}"> 
                    </#if>
                </figure>

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
            <span class="search-results__sub-title">
                ${result.date?date?string("MMMM dd, yyyy")} via 
                <span class="fab fa-facebook" aria-hidden="true"></span>                                 
                Facebook
            </span>
            
            <#-- Summary -->
            <p class="search-results__desc">
                ${(response.customData.stencilsMethods.linkify(result.listMetadata["c"]?first!))!?no_esc}
            </p>
            
            <#-- 
                It is common that users share links as posts which we have called a post link. 
                This section displays the link which is associated with the facebook posts.
            -->
            <#if (result.listMetadata["stencilsFacebookPostLink"]?first)!?has_content>
                <div class="facebook-post__post-link"> 
                    <#if (result.listMetadata["image"]?first)!?has_content>
                        <img class="deferred post-link__img" alt="Thumbnail for ${result.title!}" src="//${httpRequest.getHeader('host')}/stencils/resources/base/v15.8/img/pixel.gif" data-deferred-src="${(result.listMetadata["image"]?first)!}"> 
                    </#if>

                    <#-- Title of the link -->
                    <div class="search-results__sub-title post-link__sub-title">
                        <a href="${(result.listMetadata["stencilsFacebookPostLink"]?first)!}" class="search-results__link">
                            <@s.boldicize>
                                <@s.Truncate length=90>
                                    ${(result.listMetadata["stencilsFacebookPostLinkName"]?first)!}
                                </@s.Truncate>
                            </@s.boldicize>
                        </a>
                    </div>                    
                    
                    <#-- Description / summary of the link -->
                    <#if (result.listMetadata["stencilsFacebookPostLinkDescription"]?first)!?has_content>
                        <div class="search-results__desc post-link__sub-description">
                            <@s.boldicize>
                                <@s.Truncate length=120>
                                    ${(result.listMetadata["stencilsFacebookPostLinkDescription"]?first)!}
                                </@s.Truncate>
                            </@s.boldicize>
                        </div>
                    </#if>
                </div>
            </#if>

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
                        <#-- Author -->
                        <#if (result.listMetadata["stencilsFacebookProfileUrl"]?first)!?has_content>
                           <li class="contact__item">                                
                                By:
                                <a class="highlight" href="${result.customData["stencilsFacebookProfileUrl"]!}">
                                    ${(result.listMetadata["author"]?first)!}
                                </a>                                                                 
                            </li>
                        </#if>                        
                    </ul>
                </section>
            </div>            
        </div>
    </article>
</#macro>

<#macro PostResult result=result>
  <li class="search-result search-result-facebook search-result-facebook-post mb-3">
    <div class="card">

      <div class="card-body">
        <div class="media">
          <a href="${result.customData["stencilsFacebookProfileUrl"]!}">
            <img class="mr-3" src="${result.customData["stencilsFacebookProfileImageUrl"]!}">
          </a>
          <div class="media-body">
            <i class="fab fa-facebook-square float-right text-muted" aria-hidden="true"></i>
            <h4>
              <a href="${result.clickTrackingUrl}" title="${result.liveUrl}">${result.metaData["author"]!"Unknown author"}</a>
            </h4>
            <div class="card-subtitle text-muted">
              ${result.date?date?string("MMMM dd, yyyy")} via Facebook
              <@history_cart.LastVisitedLink result=result/>
            </div>
          </div>
        </div>

        <div class="card-text mt-3">
          <@s.boldicize>${response.customData.stencilsMethods.linkify(result.metaData["c"]!)?no_esc}</@s.boldicize>

          <#if result.metaData["stencilsFacebookPostLink"]??>
            <hr>
            <#if result.listMetadata["image"]!?has_content>
              <img class="img-fluid float-right ml-3 deferred" alt="Thumbnail for ${result.title}" src="//${httpRequest.getHeader('host')}/stencils/resources/base/v15.8/img/pixel.gif" data-deferred-src="${result.listMetadata["image"][0]!}">
            </#if>
            <h5><a href="${result.metaData["stencilsFacebookPostLink"]!}">${result.metaData["stencilsFacebookPostLinkName"]!}</a></h5>
            <p><@s.Truncate length=120>${result.metaData["stencilsFacebookPostLinkDescription"]!}</@s.Truncate></p>
          </#if>
        </div>
      </div>
    </div>
  </li>
</#macro>

<#-- vim: set expandtab ts=2 sw=2 sts=2 :-->