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
    <!-- courses.GenericView -->
    <article class="search-results__item search-results__item--people" data-fb-result="${result.indexUrl}">
        <figure class="search-results__bg">
            <#if (result.listMetadata["image"]?first)!?has_content>
                <img class="deferred rounded-circle fb-image-thumbnail" alt="Thumbnail for ${result.title!}" src="//${httpRequest.getHeader('host')}/stencils/resources/base/v15.8/img/pixel.gif" data-deferred-src="${result.listMetadata["image"]?first}"> 
            <#elseif ((question.getCurrentProfileConfig().get("stencils.showcase"))!"FALSE")?upper_case == "TRUE"> 
                <img alt="Thumbnail for ${result.title!}" src="https://source.unsplash.com/random/160x160?${(result.title)!''?url}"> 
            </#if>
        </figure>
        <div class="search-results__content">
            <h3 class="search-results__title">
                <a href="${result.clickTrackingUrl!}" title="${result.liveUrl!}" class="search-results__link">
                    <@s.boldicize>
                        <@s.Truncate length=90>
                            ${(result.title)!}
                        </@s.Truncate>
                    </@s.boldicize>
                </a>
                <span class="enable-cart-on-result float-right" 
                    aria-label="Add result to the shortlist">
                </span>                
            </h3>
            
            <#-- Subtitle -->
            <#if (result.listMetadata["courseSubject"]?first)!?has_content>
                <span class="search-results__sub-title">
                    ${(result.listMetadata["courseSubject"]?first)!}       
                    <#if (result.listMetadata["courseNumber"]?first)!?has_content>
                        (${(result.listMetadata["courseNumber"]?first)!})
                    </#if>                                  
                </span>
            </#if>               
            
            <#-- Summary -->
            <#if (result.listMetadata["courseDesc"]?first)!?has_content>
                <p class="search-results__desc">
                    <@s.boldicize>                    
                        ${(result.listMetadata["courseDesc"]?first)!}
                    </@s.boldicize>
                </p>
            </#if>                

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

            <p>
                <a href="${result.clickTrackingUrl!}" class="btn--link">VIEW MORE</a> 
            </p>

            <@history_cart.LastVisitedLink result=result/>

            <div class="search-results__bottom">
                <section class="contact js-contact">
                    <ul class="contact__list">                        
                        <#if (result.listMetadata["courseTerm"]?first)!?has_content>
                           <li class="contact__item">
                                <span class="search-results__icon--red fas far fa-clock" aria-label="Term" title="Term"></span> 

                                ${(result.listMetadata["courseTerm"]?first)!}
                            </li>
                        </#if>                        
                        
                        <#if (result.listMetadata["courseCampus"]?first)!?has_content>
                            <li class="contact__item ">
                                <span class="search-results__icon--red fas fa-map-marker-alt" aria-label="Campus" title="Campus"></span> 
                                ${(result.listMetadata["courseCampus"]?first)!} campus
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
    <!-- courses.AutoCompleteTemplate -->
	<script id="auto-completion-courses" type="text/x-handlebars-template">
		<div class="fb-auto-complete--non-organic">
            <h6>
                {{extra.disp.title}}
            </h6>

            <div class="details">
                {{#if extra.disp.metaData.courseSubject}}
                    <div class="fb-auto-complete__body__metadata text-muted">
                        {{extra.disp.metaData.courseSubject}} 
                        {{#if extra.disp.metaData.courseNumber}}
                            ({{extra.disp.metaData.courseNumber}})
                        {{/if}} 
                    </div>
                {{/if}}

                {{#if extra.disp.metaData.courseTerm}}
                    <div class="fb-auto-complete__body__metadata text-muted">
                        {{extra.disp.metaData.courseTerm}}
                    </div>
                {{/if}}
            </div>      
		</div>    
	</script>
</#macro>

<#macro CartTemplate>
    <!-- courses.CartTemplate -->    
    <script id="cart-template-higher-education-courses" type="text/x-handlebars-template">
        <article class="search-results__item search-results__item--default">
            <figure class="search-results__bg">
                {{#if metaData.image}}  
                    <img class="card-img-top" alt="Thumbnail for {{title}}" src="{{metaData.image}}" /> 
                <#-- Show a placeholder image for showcase -->
                <#if ((question.getCurrentProfileConfig().get("stencils.showcase"))!"FALSE")?upper_case == "TRUE">
                    {{else}}
                        <img class="card-img-top" alt="Thumbnail for {{title}}" src="https://source.unsplash.com/random/335x192?{{title}}"> 
                </#if>    
                {{/if}}
            </figure>
            <div class="search-results__content">
                {{#if title}} 
                    <h3 class="search-results__title">
                        <a href="{{indexUrl}}" title="{{title}}" class="search-results__link">
                            {{#truncate 255}}
                                {{title}}  
                            {{/truncate}}
                        </a>
                        <span class="enable-cart-on-result"></span>
                    </h3>
                {{/if}}
                
                <#-- Pretty version of the url of the document -->
                <#--  
                <cite>
                    {{#truncate 90}}
                        {{indexUrl}}
                    {{/truncate}}                
                </cite>  
                -->

                <#-- Subtitle -->
                {{#if metaData.courseSubject}}  
                    <span class="search-results__sub-title">
                        {{metaData.courseSubject}}       
                        {{#if metaData.courseNumber}} 
                            ({{metaData.courseNumber}})
                        {{/if}}                                  
                    </span>
                {{/if}}    
                
                <#-- Summary -->
                {{#if metaData.courseDesc}} 
                    <p class="search-results__desc">
                        {{#truncate 255}}
                            {{metaData.courseDesc}}  
                        {{/truncate}}
                    </p>
                {{/if}}

                <#-- Metadata can be shown as tags -->
                <section class="tags">
                    <ul class="tags__list">
                        {{#if metaData.courseDepartment}}  
                            <li class="tags__item">
                                {{metaData.courseDepartment}}  
                            </li>
                        {{/if}} 
                        {{#if metaData.courseDelivery}}  
                            <li class="tags__item">
                                {{metaData.courseDelivery}}  
                            </li>
                        {{/if}} 
                        {{#if metaData.courseCredit}}  
                            <li class="tags__item">
                                {{metaData.courseCredit}}  
                            </li>
                        {{/if}} 
                    </ul>
                </section> 
                
                <p>
                    <span class="fb-cart__remove"></span>
                </p>
                <div class="search-results__bottom">
                    <section class="contact js-contact">
                        <ul class="contact__list">                        
                            {{#if metaData.courseTerm}} 
                                <li class="contact__item">
                                    <span class="search-results__icon--red fas far fa-clock" aria-label="Term" title="Term"></span> 
                                    {{metaData.courseTerm}}  
                                </li>
                            {{/if}}                       
                            
                            {{#if metaData.courseCampus}} 
                                <li class="contact__item ">
                                    <span class="search-results__icon--red fas fa-map-marker-alt" aria-label="Campus" title="Campus"></span> 
                                    {{#list metaData.courseCampus joinWith=","}}
                                        {{this}}
                                    {{/list}}                                    
                                </li>
                            {{/if}}                       
                        </ul>
                    </section>
                </div>                         
            </div>
        </article>
    </script>
  
  </#macro>