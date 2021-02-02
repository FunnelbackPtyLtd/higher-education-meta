<#ftl encoding="utf-8" output_format="HTML" />
<#-- 
    Contains the default presentation logic for a 
    document which is not configured with its own 
    markup. 
-->

<#-- 
    Macro decides how each result should be presented. 

    @param result An individual result fron the data model
    @param view An uppercase string which represents how
        the result should be displayed. Defaults to LIST.
-->
<#macro Result result view="LIST">
    <#switch view?upper_case>
        <#case "CARD">
            <@CardView result=result />
            <#break>
        <#case "LIST">
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
    <@GenericView result=result cardClass="fb-card--list" />
</#macro>

<#--
    Card view of a result which is to be displayed in the 
    main section of the search engine result page (SERP)
    @param result An individual result fron the data model
-->
<#macro CardView result>
    <@GenericView result=result cardClass="fb-card--fixed" />
</#macro>

<#--
    A generic view used to drive both the the list and card view
    @param result An individual result fron the data model
-->
<#macro GenericView result cardClass="fb-card--fixed">
    <!-- video.GenericView -->
    <article class="search-results__item search-results__item--video" data-fb-result="${(result.indexUrl)!}">
        <a href="${result.clickTrackingUrl!}">
        <figure class="search-results__bg">
            <#if (result.listMetadata["image"]?first)!?has_content>
                <img class="deferred rounded-circle fb-image-thumbnail" alt="Thumbnail for ${result.title!}" src="//${httpRequest.getHeader('host')}/stencils/resources/base/v15.8/img/pixel.gif" data-deferred-src="${result.listMetadata["image"]?first}">   -->
            <#elseif ((question.getCurrentProfileConfig().get("stencils.showcase"))!"FALSE")?upper_case == "TRUE"> 
                <img alt="Thumbnail for ${result.title!}" src="https://source.unsplash.com/collection/73776582/160x160"> 
            </#if>   
        </figure>
        </a>
        <div class="search-results__content">
            <#if (result.title)!?has_content>
                <h4 class="search-results__title">
                    <#--  <span class="fas fa-briefcase text-muted pull-right small mr-2" title="Job"></span>  -->
                    <a href="${result.clickTrackingUrl!}" title="${result.title!}" class="search-results__link">
                        <@s.boldicize>
                            <@s.Truncate length=90>
                                ${(result.title)!} 
                            </@s.Truncate>
                        </@s.boldicize>
                    </a>
                </h4>
            </#if>
            
            <#-- Pretty version of the url of the document -->
            <cite>
                <@s.Truncate length=90>
                    ${(result.displayUrl)!}
                </@s.Truncate>                
            </cite>

            <#-- Subtitle -->
            <div class="search-results__sub-title">
            </div>
            
            <#-- Summary -->
            <p class="search-results__desc">
                <@s.boldicize>
                    ${result.summary!?no_esc}
                </@s.boldicize>
            </p>

            <#-- Metadata can be shown as tags -->
            <#list result.listMetadata["videoCategory"]![]>
                <section class="tags">                
                    <ul class="tags__list">
                        <#items as category>                                                        
                            <li class="tags__item" title="Video category">                        
                                ${category!}
                            </li>
                        </#items>
                    </ul>
                </section>  
            </#list>                     
          
            <#-- Display the time which this result has last been visited by the user -->
            <@history_cart.LastVisitedLink result=result/> 
            
            <div class="search-results__bottom">
                <section class="contact js-contact">
                    <ul class="contact__list">                        
                        <#if (result.listMetadata["videoDurationPretty"]?first)!?has_content>                    
                            <li class="contact__item" title="Duration of video">
                                <span class="search-results__icon--red far fa-clock" aria-label="Duration of video" title="Duration of video"></span>
                                ${(result.listMetadata["videoDurationPretty"]?first)!} 
                            </li>
                        <#elseif (result.listMetadata["videoDuration"]?first)!?has_content>                    
                            <li class="contact__item" title="Duration of video">
                                <span class="search-results__icon--red far fa-clock" aria-label="Duration of video" title="Duration of video"></span>
                                ${(result.listMetadata["videoDuration"]?first)!} 
                            </li>
                        </#if>
                        <#if (result.listMetadata["videoViewCount"]?first)!?has_content>                    
                            <li class="contact__item" title="Duration of video">
                                <span class="search-results__icon--red far fa-eye" aria-label="Number of views"></span>
                                ${(result.listMetadata["videoViewCount"]?first)!} 
                            </li>
                        </#if>

                        <li class="contact__item wrap">
                            ${result.date?date?string.short!} - Uploaded by ${result.metaData["videoAuthor"]!"Unknown"}
                        </li>

                        <#-- Uncomment to show likes and dislikes -->
                        <#-- 
                        <#if (result.listMetadata["videoLikes"]?first)!?has_content>                    
                            <li class="contact__item" title="Duration of video">
                                <span class="search-results__icon--red far fa-thumbs-up" aria-label="Number of likes"></span>
                                ${(result.listMetadata["videoLikes"]?first)!} 
                            </li>
                        </#if>
                        <#if (result.listMetadata["videoDislikes"]?first)!?has_content>                    
                            <li class="contact__item" title="Duration of video">
                                <span class="search-results__icon--red far fa-thumbs-down" aria-label="Number of dislikes"></span>
                                ${(result.listMetadata["videoDislikes"]?first)!} 
                            </li>
                        </#if>  
                        -->
                    </ul>
                </section>
            </div>                         
        </div>
    </article>
</#macro>
