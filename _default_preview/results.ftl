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
    <!-- results.GenericView -->
    <article class="listing-item listing-item--generic listing-item--background-grey10 listing-item--color-black" data-fb-result="${(result.indexUrl)!}">
        <#if (result.listMetadata["image"]?first)!?has_content>
            <div class="listing-item__image-wrapper">
                <img class="deferred listing-item__image" alt="Thumbnail for ${result.title!}" src="//${httpRequest.getHeader('host')}/s/resources/${question.collection.id}/${question.profile}/img/pixel.gif" data-deferred-src="${result.listMetadata["image"]?first}"> 
            </div>  
        <#elseif ((question.getCurrentProfileConfig().get("stencils.showcase"))!"FALSE")?upper_case == "TRUE">
            <div class="listing-item__image-wrapper">
                <img class="listing-item__image" alt="Thumbnail for ${result.title!}" src="https://source.unsplash.com/random/160x160?${(result.title)!''?url}">
            </div>
        </#if>
        <div class="listing-item__content">
            <#-- Title -->
            <#if (result.title)!?has_content>
                <div class="listing-item__header">
                    <#-- Show an icon to represented the file type of the current document -->
                    <#switch result.fileType>
                        <#case "pdf">
                            <i class="far fa-file-pdf" aria-hidden="true"></i>
                            <#break>
                        <#case "doc">
                        <#case "docx">
                        <#case "rtf">
                            <i class="far fa-file-word" aria-hidden="true"></i>
                            <#break>
                        <#case "xls">
                        <#case "xlsx">
                            <i class="far fa-file-excel" aria-hidden="true"></i>
                            <#break>
                        <#case "ppt">
                        <#case "pptx">
                            <i class="far fa-file-powerpoint" aria-hidden="true"></i>
                            <#break>
                    </#switch>

                    <a href="${result.clickTrackingUrl!}" title="${result.title!}" class="listing-item__title-link">
                        <h3 class="listing-item__title">
                            <@s.boldicize>
                                <@s.Truncate length=90>
                                    ${(result.title)!} 
                                </@s.Truncate>
                            </@s.boldicize>
                        </h3>
                    </a>

                    <#--  Example of subtitle with icon -->
                    <#--
                    <div class="listing-item__subtitle">
                        <svg class="svg-icon svg-icon--small">
                            <title>Location</title>
                            <use href="#map"></use>
                        </svg>
                        <a href="https://goo.gl/maps/3Ze7mNBpey6D6Q2k6" target="_blank" title="Opens in new window" class="listing-item__subtitle-link" rel="noreferrer">
                            Online
                        </a>
                    </div>
                    -->
                    <#-- Pretty version of the url of the document -->
                    <cite class="listing-item__subtitle listing-item__subtitle--highlight">
                        <@s.Truncate length=90>
                            ${(result.displayUrl)!}
                        </@s.Truncate>                
                    </cite>
                </div>
            </#if>
            
            
            <#-- Body -->
            <div class="listing-item__body">
                <#-- Summary -->
                <div class="listing-item__summary">
                    <@s.boldicize>
                        ${result.summary!?no_esc}
                    </@s.boldicize>
                </div>

                <#-- Metadata should as tags/pills -->        
                <#if (result.listMetadata["author"])!?has_content>
                    <ul aria-label="Result tags" class="listing-item__tags">
                        <#list result.listMetadata["author"] as author>
                            <li class="listing-item__tag">${author}</li>
                        </#list>
                    </ul>
                </#if>

                <#-- Call to Action (CTA) -->                        
                <#--  <a href="${result.clickTrackingUrl!}" class="listing-item__action">VIEW MORE</a>   -->
            </div>          

            <#-- Display the time which this result has last been visited by the user -->
            <@history_cart.LastVisitedLink result=result/> 

            <#-- Footer -->
            <#--              
                <div class="listing-item__footer">
                    <div class="listing-item__footer-block listing-item__footer-block">
                        <svg class="svg-icon svg-icon--small">
                            <title>Time</title>
                            <use href="#time">
                            </use>
                        </svg>
                        10:30 AM - 1:30 PM
                    </div>
                    <a href="mailto:it@department.edu" class="listing-item__footer-block listing-item__footer-block--highlight">
                        <svg class="svg-icon svg-icon--small">
                            <title>Contact email</title>
                            <use href="#email"></use>
                            </svg>
                            it@department.edu 
                    </a>
                    <a href="tel:650.725.4747" class="listing-item__footer-block listing-item__footer-block--highlight">
                        <svg class="svg-icon svg-icon--small">
                            <title>Contact phone</title>
                            <use href="#phone"></use>
                        </svg>
                        650.725.4747 
                    </a>
                </div>                                
            -->
        </div>
    </article>
</#macro>

<#-- 
    Output the template used in the quick view. Quick view
    allows the user view more information about a particular
    document without them having to leave the search results page.
    This aims to minimise the amount of hopping back and forth 
    between systems.
-->
<#macro QuickView result> 
    <!-- results.QuickViewTemplate -->
    <section id="${base.getCssID(result.liveUrl)}" class="quick-view js-quick-view" tabindex="-1" role="dialog">
        <button class="quick-view__close"><span class="sr-only">close</span></button>
        <div class="quick-view__wrapper">
            <div class="quick-view__content">
                <h2 class="quick-view__title">
                    ${result.title!}          
                </h2>
                <p class="quick-view__desc">
                    <#if (result.listMetadata["c"]?first)!?has_content>
                        ${(result.listMetadata["c"]?first)!}
                    <#else>
                        ${result.summary!}
                    </#if>
                </p>
                <div class="quick-view__details">
                    <h3 class="quick-view__details-title">Program details</h3>

                    <div class="quick-view__details-content">
                        <#--  Introduction  -->
                        <#--  
                        <p>
                            Insert more information
                        </p>
                        <p>
                            Insert even more information
                        </p>  
                        -->
                        <#-- Details panel -->
                        <#--                          
                        <dl>
                            <#if (result.listMetadata["programCredentialType"]?first)!?has_content>
                                <dt>Credential type:</dt>
                                <dd>${(result.listMetadata["programCredentialType"]?first)!} </dd>
                            </#if>                    
                            <#if (result.listMetadata["stencilsTermCodes"]?first)!?has_content >
                                <dt>Term codes:</dt>
                                <dd>${(result.listMetadata["stencilsTermCodes"]?join(", "))!} </dd>
                            </#if>             
                        </dl>  
                        -->
                        <a href="${result.clickTrackingUrl!}" class="btn" data-target="#${base.getCssID(result.liveUrl)}">
                            Visit page
                        </a>                    
                    </div>
                </div>
            </div>
            <#-- TODO: Add related results -->
        </div>
    </section>    
</#macro>

<#-- Default template for items that have been added to the cart -->
<#macro CartTemplate>
    <!-- results.CartTemplate -->
    <script id="cart-template-default" type="text/x-handlebars-template">
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
                    <h4 class="search-results__title">
                        <a href="{{indexUrl}}" title="{{title}}" class="search-results__link">
                            {{#truncate 255}}
                                {{title}}  
                            {{/truncate}}
                        </a>

                        <span class="enable-cart-on-result"></span>
                    </h4>
                {{/if}}
                
                <#-- Pretty version of the url of the document -->
                <cite>
                    {{#truncate 90}}
                        {{indexUrl}}
                    {{/truncate}}                
                </cite>

                
                <#-- Summary -->
                {{#if summary}}
                    <p class="search-results__desc">
                        {{#truncate 255}}
                            {{summary}}  
                        {{/truncate}}
                    </p>
                {{/if}}

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
                        <li class="tags__item">
                            Lorem
                        </li>
                        <li class="tags__item">
                            Lorem ipsum
                        </li>
                        <li class="tags__item">
                            Lorem
                        </li>
                    </ul>
                </section>  
                -->
                <div class="search-results__bottom">
                    <span class="fb-cart__remove"></span>
                </div>                         
            </div>
        </article>
    </script>
  </#macro>


<#-- 
    Determines if the results are to be displayed normally
    or grouped together by some criteria

    ToDo - Add browsing results to this
-->
<#macro ResultList nestedRank=-1>
    <#assign displayMode = search_tools.getDisplayMode(question)>

    <#if (response.customData["stencilsGroupingResults"].mode)!?has_content>
        <@GroupedResults view=displayMode/>
    <#else>
        <@StandardResults view=displayMode nestedRank=-1>
            <#nested>    
        </@StandardResults>
    </#if>
</#macro>

<#--
    Iterate over results and choose the right template depending
    on the results type and what is configured in collection.cfg

    Defaults to <code>&lt;@project.Result /&gt;

    @param nestedRank Before which result to insert the nested content of the macro.
        This is used to insert content (usually an extra search) between results.
-->
<#macro StandardResults view="LIST" nestedRank=-1>
    <!-- base.StandardResults -->
    <div class="no-wysiwyg listing listing--linked-title">
        <div class="listing__intro "></div>
        <#list (response.resultPacket.resultsWithTierBars)![] as result>
            <#if result.class.simpleName == "TierBar">
                <#--  <@TierBar result=result />  -->
            <#else>
                <#if nestedRank gte 0 && result.rank == nestedRank>
                    <#nested>
                </#if>
                
                <#-- Display the result based on the configured template -->
                <@Result result=result view=view/>                
            </#if>
        </#list>
    </div>
</#macro>

<#--
    Displays a search result using the the right template depending
    on the results type and what is configured in collection.cfg

    Defaults to <code>&lt;@project.Result /&gt;

    @param result The search result to output
-->
<#macro ProcessResult result question=question view="LIST">
    <#-- Get result template depending on collection name -->
    <#assign resultDisplayLibrary = question.getCurrentProfileConfig().get("stencils.template.result.${result.collection}")!"" />

    <#-- If not defined, attempt to get it depending on the gscopes the result belong to -->
    <#if !resultDisplayLibrary?has_content>
        <#list (result.gscopesSet)![] as gscope>
            <#assign resultDisplayLibrary = question.getCurrentProfileConfig().get("stencils.template.result.${gscope}")!"" />
            <#if resultDisplayLibrary?has_content>
                <#break>
            </#if>
        </#list>
    </#if>

    <#if .main[resultDisplayLibrary]??>
        <#-- Output the result using the presentation specified in the configurations -->
        <@.main[resultDisplayLibrary].Result result=result view=view />
    <#elseif .main["results"]??>
        <#-- Default presentation -->
        <@.main["results"].Result result=result view=view />
    <#elseif .main["project"]??>
        <#-- Default presentation for legacy (pre 15.24.x) implementations -->
        <@.main["project"].Result result=result view=view />
    <#else>
        <div class="alert alert-danger" role="alert">
            <strong>Result template not found</strong>: Template <code>&lt;@<#if resultDisplayLibrary?has_content>${resultDisplayLibrary}<#else>(default namespace)</#if>.Result /&gt;</code>
            not found for result from collection <em>${result.collection}</em>.
        </div>
    </#if>
</#macro>

<#macro GroupedResults view="LIST">
    <#-- Loop through each grouped result tier -->
    <#if (response.resultPacket.results)!?has_content>
        <article class="search-results__list <#if search_tools.getDisplayMode(question)! == 'LIST' || search_tools.getDisplayMode(question)! == 'BROWSE'>search-results__list--list-view</#if>">
            <#list (response.customData["stencilsGroupingResults"].groups)![] as group>
                <#-- Create facet link to be used in the title and "see more" -->
                <#assign searchLink = question.getCurrentProfileConfig().get("ui.modern.search_link")!>
                <#assign facetLink = (group.url)!"">

                <a class="highlight search-results__group-label" href="${searchLink + facetLink}">           
                    ${group.label}
                </a>
        
                <#list response.resultPacket.results as result>                        
                    <#-- Display the result based on the configured template -->
                    <#switch ((response.customData["stencilsGroupingResults"].mode)!"")?upper_case>
                        <#case "METADATA">
                            <#if (result.listMetadata["group.field"]?first)!?has_content>
                                <@Result result=result view=view />
                            </#if>
                            <#break> 
                        <#case "COLLECTION">
                            <#if result.collection == (group.field)!"">
                                <@Result result=result view=view />
                            </#if>
                            <#break>
                        <#default>                
                            <#break>
                    </#switch>         
                </#list>

                <#-- See more link -->
                <a href="${searchLink + facetLink}" class="search-results__group-see-more-label highlight"> 
                    <i class="fas fa-arrow-right mr-1"></i>
                    See more ${group.label} 
                </a>
            </#list>    
        </article>
    </#if>
</#macro>

<#--
    Iterate over results and choose the right quick view template depending
    on the results type and what is configured in collection.cfg

    Defaults to <code>&lt;@project.Result /&gt;
-->
<#macro QuickViewTemplates>
    <!-- base.QuickViewTemplates -->
    <#list (response.resultPacket.resultsWithTierBars)![] as result>
        <#if result.class.simpleName == "TierBar">
            <#-- Ignore tier bars -->
        <#else>            
            <#-- Display the result based on the configured template -->
            <@QuickViewTemplate result=result />                
        </#if>
    </#list>
</#macro>

<#--
    Displays a search result using the the right quick view template depending
    on the results type and what is configured in collection.cfg

    Defaults to <code>&lt;@project.Result /&gt;

    @param result The search result to output
-->
<#macro QuickViewTemplate result question=question>
    <#-- Get result template depending on collection name -->
    <#assign resultDisplayLibrary = question.getCurrentProfileConfig().get("stencils.template.result.${result.collection}")!"" />

    <#-- If not defined, attempt to get it depending on the gscopes the result belong to -->
    <#if !resultDisplayLibrary?has_content>
        <#list (result.gscopesSet)![] as gscope>
            <#assign resultDisplayLibrary = question.getCurrentProfileConfig().get("stencils.template.result.${gscope}")!"" />
            <#if resultDisplayLibrary?has_content>
                <#break>
            </#if>
        </#list>
    </#if>

    <#if .main[resultDisplayLibrary]??>
        <@.main[resultDisplayLibrary].QuickView result=result />
    <#elseif .main["project"]??>
        <#-- Default Result macro in current namespace -->
        <@.main["project"].QuickView result=result/>
    <#else>
        <div class="alert alert-danger" role="alert">
            <strong>Result template not found</strong>: Template <code>&lt;@<#if resultDisplayLibrary?has_content>${resultDisplayLibrary}<#else>(default namespace)</#if>.Result /&gt;</code>
            not found for result from collection <em>${result.collection}</em>.
        </div>
    </#if>
</#macro>