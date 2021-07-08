<#ftl encoding="utf-8" output_format="HTML" />

<#-- 
    Macro decides how each result should be presented. 

    @param result An individual result from the data model
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
    Standard view of a result which is to be displayed in the 
    main section of the search engine result page (SERP)
    @param result An individual result from the data model
-->
<#macro ListView result>
    <@GenericView result=result />
</#macro>

<#--
    Card view of a result which is to be displayed in the 
    main section of the search engine result page (SERP)
    @param result An individual result from the data model
-->
<#macro CardView result>
    <@GenericView result=result />
</#macro>

<#--
    A generic view used to drive both the the list and card view
    @param result An individual result from the data model
-->
<#macro GenericView result>
    <!-- programs.GenericView -->
    <article class="search-results__item search-results__item--default" data-fb-result="${result.indexUrl}">
        <figure class="search-results__bg">
            <#if (result.listMetadata["programImage"]?first)!?has_content>
                <img class="deferred" alt="Thumbnail for ${result.title!}" src="//${httpRequest.getHeader('host')}/stencils/resources/base/v15.8/img/pixel.gif" data-deferred-src="${result.listMetadata["programImage"]?first}"> 
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
                <span class="enable-cart-on-result pull-right" 
                    aria-label="Add result to the shortlist">
                </span>                
            </h3>
            
            <#-- Subtitle -->
            <#if (result.listMetadata["programFaculty"]?first)!?has_content>
                <span class="search-results__sub-title">
                    ${(result.listMetadata["programFaculty"]?first)!}                                     
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

            <#-- Metadata can be shown as tags -->
            <section class="tags">
                <ul class="tags__list">
                    <#if (result.listMetadata["programCredentialType"]?first)!?has_content>
                        <li class="tags__item" title="Credential type">
                            <@s.boldicize>                    
                                ${(result.listMetadata["programCredentialType"]?first)!}
                            </@s.boldicize>
                        </li>
                    </#if>                   
                    <#if (result.listMetadata["stencilsDeliveryMethod"]?first)!?has_content>
                        <li class="tags__item" title="Delivery method">
                            <@s.boldicize>                    
                                ${(result.listMetadata["stencilsDeliveryMethod"]?first)!}
                            </@s.boldicize>
                        </li>
                    </#if>                   
                    <#if (result.listMetadata["programCredits"]?first)!?has_content>
                        <li class="tags__item" title="Credits">
                            <@s.boldicize>                    
                                ${(result.listMetadata["programCredits"]?first)!}
                            </@s.boldicize>
                            credits
                        </li>
                    </#if>                   
                </ul>
            </section>

            <#-- Call to Action (CTA) -->
            <p>
                <a href="${result.clickTrackingUrl!}" class="btn--link">VIEW MORE</a> 
            </p>

            <#-- Display the time which this result has last been visited by the user -->
            <@history_cart.LastVisitedLink result=result/>

            <#-- Footer -->
            <div class="search-results__bottom">
                <section class="contact js-contact">
                    <ul class="contact__list">                        
                        <#if (result.listMetadata["programLengthYears"])!?has_content>
                           <li class="contact__item">
                                <span class="search-results__icon--red fas far fa-clock" aria-label="Program length" title="Program length"></span> 

                                ${(result.listMetadata["programLengthYears"]?first)!} years
                            </li>
                        </#if>                                             
                        <#if (result.listMetadata["programCampus"]?first)!?has_content>
                            <li class="contact__item ">
                                <span class="search-results__icon--red fas fa-map-marker-alt" aria-label="Campus" title="Campus"></span> 
                                ${(result.listMetadata["programCampus"]?first)!} campus
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
    <!-- programs.AutoCompleteTemplate -->
	<script id="auto-completion-programs" type="text/x-handlebars-template">
		<div class="fb-auto-complete--non-organic">
            <h6>
                {{{extra.disp.title}}}

                {{#if extra.disp.metaData.programCredentialType}}
                        ({{{extra.disp.metaData.programCredentialType}}})
                {{/if}}                
            </h6>

            <div class="details">
                {{#if extra.disp.metaData.programFaculty}}
                    <div class="fb-auto-complete__body__metadata text-muted">
                        {{{extra.disp.metaData.programFaculty}}}
                    </div>
                {{/if}}

                {{#if extra.disp.metaData.stencilsDeliveryMethod}}
                    <div class="fb-auto-complete__body__metadata text-muted">
                        {{{extra.disp.metaData.stencilsDeliveryMethod}}}
                    </div>
                {{/if}}                
            </div>      
		</div>    
	</script>
</#macro>

<#-- Output the cart template -->
<#macro CartTemplate>
    <!-- programs.CartTemplate -->    
    <#-- 
        Note: Cart templates as assigned to document types in profile.cfg/collection.cfg using 
        the following configuration:

        stencils.template.shortlist.<collection>=<type> 
        
        e.g. stencils.template.shortlist.higher-education-meta=programs

        For this to function correctly, the ID must be in the following format:
        id="cart-template-<type>".

        e.g. id="cart-template-programs"
    -->
    <script id="cart-template-programs" type="text/x-handlebars-template">
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
                {{#if metaData.programFaculty}}  
                    <span class="search-results__sub-title">
                        {{metaData.programFaculty}}       
                    </span>
                {{/if}}    
                
                <#-- Summary -->
                {{#if metaData.c}} 
                    <p class="search-results__desc">
                        {{#truncate 255}}
                            {{metaData.c}}  
                        {{/truncate}}
                    </p>
                {{/if}}

                <#-- Metadata can be shown as tags -->
                <section class="tags">
                    <ul class="tags__list">
                        {{#if metaData.programCredentialType}}  
                            <li class="tags__item" title="Credential type">
                                {{metaData.programCredentialType}}  
                            </li>
                        {{/if}} 
                        {{#if metaData.stencilsDeliveryMethod}}  
                            <li class="tags__item" title="Delivery method">
                                {{metaData.stencilsDeliveryMethod}}  
                            </li>
                        {{/if}} 
                        {{#if metaData.programCredits}}  
                            <li class="tags__item" title="Credits">
                                {{metaData.programCredits}} credits
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
                            {{#if metaData.programLengthYears}} 
                                <li class="contact__item">
                                    <span class="search-results__icon--red fas far fa-clock" aria-label="Program length" title="Program length"></span> 
                                    {{metaData.programLengthYears}} years                                       
                                </li>
                            {{/if}}                                                   
                        </ul>
                    </section>
                </div>                         
            </div>
        </article>
    </script>
  
  </#macro>