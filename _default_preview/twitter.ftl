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
        the result should be displayed. Defaults to List.
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
    <!-- twittter.GenericView -->
    <article class="search-results__item search-results__item--twitter"  data-fb-result="${(result.indexUrl)!}">
        <figure class="search-results__bg">
            <#if (result.listMetadata["image"]?first)!?has_content>
                <img class="deferred" alt="Thumbnail for ${result.title!}" src="//${httpRequest.getHeader('host')}/stencils/resources/base/v15.8/img/pixel.gif" data-deferred-src="${(result.listMetadata["image"]?first)!}">
            <#elseif ((question.getCurrentProfileConfig().get("stencils.showcase"))!"FALSE")?upper_case == "TRUE">
                <img alt="Thumbnail for ${result.title!}" src="https://source.unsplash.com/random/160x160?${(result.title)!''?url}"> 
            </#if>
        </figure>
        <div class="search-results__header">
            <h3 class="search-results__title">
                <#if (result.listMetadata["author"]?first)!?has_content>
                    <a href="https://twitter.com/${(result.listMetadata["author"]?first)!}" 
                        class="search-results__link"
                        aria-label="View the profile of @${(result.listMetadata["author"]?first)!}">
                        @${(result.listMetadata["author"]?first)!}
                    </a>
                </#if>
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
            <#if (result.date)!?has_content>
                <time datetime="${(result.date)!?date}">
                    ${(result.date)!?date}
                </time>                                 
                <span class="fab fa-twitter" aria-hidden="true"></span>                                             
                via twitter
            </#if>
        </div>
                
        <div class="search-results__content">
        
            <#-- Summary -->
            <p class="search-results__desc">
                <@s.boldicize>
                    ${result.summary!?no_esc}
                </@s.boldicize>
            </p>

            <#-- Metadata can be shown as tags -->
            <#list result.listMetadata["twitterHashTag"]![]>
                <section class="tags hashtag">                
                    <ul class="tags__list">  
                        <#items as hashtag>
                            <li class="tags__item">
                                <a class="hashtag__link" href="https://twitter.com/hashtag/${hashtag!}" title="Link to hashtag on twitter"> 
                                    #${hashtag!}
                                </a>
                            </li>                        
                        </#items>
                    </ul>
                </section>  
            </#list> 

            <#-- Call to Action (CTA) -->
            <p>
                <a href="${result.clickTrackingUrl!}" 
                    class="btn--link" 
                    title="View more on twitter"
                    aria-label="View more on twitter">
                    Read more
                </a>
            </p>

            <#-- Display the time which this result has last been visited by the user -->
            <@history_cart.LastVisitedLink result=result/>            
            
            <#-- Footer -->
            <#--  
            <div class="search-results__bottom">
                <section class="contact js-contact">
                    <ul class="contact__list">                        
                        <li class="contact__item">
                            <span class="search-results__icon--red fas far fa-clock" aria-label="" title=""></span> 
                            Lorem ipsum
                        </li>
                        <li class="contact__item ">
                            <span class="search-results__icon--red fas far fa-clock" aria-label="" title=""></span> 
                            Lorem ipsum
                        </li>
                    </ul>
                </section>
            </div>                                  
            -->
        </div>
    </article>
</#macro>