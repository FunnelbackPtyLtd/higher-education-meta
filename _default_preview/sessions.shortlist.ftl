<#ftl encoding="utf-8" output_format="HTML" />

<#--
  Display the shopping cart / shortlist

  Different shortlist templates can be used depending the source collection
  the result is coming from (based on the <code>C</code> metadata).
-->
<#macro Shortlist>
	<#if question.collection.configuration.valueAsBoolean("ui.modern.session")>
		<#-- 
			ToDo: Add support for card view. The problem at the moment is that the session 
			code is a bit too opinionated in injecting it own html markup which is messing with the 
			cutups.
		-->
		<section class="search-cart">
			<article id="search-cart" class="search-results__list search-results__list--list-view">
			
			</article>
		</section>
	</#if>
</#macro>

<#-- 
	A handlebars template which is used to display all the items in the cart. 
-->
<#macro ShortlistTemplate>
	<!-- sessions.shortlist.ShortlisTtemplate -->
	<script id="cart-template" type="text/x-handlebars-template">
        <button id="flb-cart-box-back" class="search-shortlist__hide" type="button">
            <svg class="svg-icon svg-icon--small"><use href="#arrow"></use></svg>
            {{>label-block label=backLabel}}
        </button>

        <div class="search-shortlist__heading-area">
            <h2 id="flb-cart-box-header" class="search-shortlist__title">
                {{>icon-block icon=headerIcon}} {{>label-block label=label}}
            </h2>
            <button
                id="flb-cart-box-clear"
                class="search-shortlist__clear"
                title="Remove all items from the shortlist"
            >
                <svg class="svg-icon svg-icon"><use href="#close"></use></svg>
                    {{>label-block label=clearLabel}}
            </button>
        </div> 

        <ul id="flb-cart-box-list" class="list-unstyled listing"></ul>
	</script>
</#macro>

<#-- Output the config required to configure the cart templates -->
<#macro ShortlistTemplatesConfig >
	<#-- 
		Output the default template which is used when no cart template 
		is explicitly defined.
	-->
	'default': document.getElementById('shortlist-template-default').text
	<#if (question.getCurrentProfileConfig().getRawKeys())!?has_content>		
		,
		<#-- 
			Output the custom cart templates config based on the 
			user's configurations 
		-->
		<#list question.getCurrentProfileConfig().getRawKeys()?filter(key -> key?lower_case?starts_with("stencils.template.shortlist.")) as key>
			<#local collection = key?keep_after_last(".")>
			<#local templateName = question.getCurrentProfileConfig().get(key)>
			'${collection}': document.getElementById('shortlist-template-${templateName}').text
			<#if key_has_next>,</#if>
		</#list> 
	</#if>
</#macro>

<#-- 
	Attempts to find and output all cart templates across all available
	namespaces. It is assummed that cart templates are macros defined with 
	the name <#macro ShortlistTemplate> </#macro>.
-->
<#macro ShortlistTemplatesForResults>
	<!-- sessions.shortlist.ShortlistTemplatesForResults -->
	<#list .main as key, namespace >
		<#if (namespace)!?is_hash && (namespace.ShortlistTemplate)!?is_directive && key != "shortlist">
			<@namespace.ShortlistTemplate />
		</#if>
	</#list>
</#macro>