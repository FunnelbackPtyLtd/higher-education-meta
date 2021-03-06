<#ftl encoding="utf-8" output_format="HTML" />
<#--
    This file is responsible for determining the overall structure
    of the search implementations. It contains things such as:

    - The HTML for the overall structure such as the header, footer 
        and main content.
    - The references to the client's header and footer
    - Third party libraries
    - References to javascript templates for sessions and concierge
-->

<#-- Core Funnelback imports -->
<#import "/web/templates/modernui/funnelback_classic.ftl" as s/>
<#import "/web/templates/modernui/funnelback.ftl" as fb />

<#-- 
	Global Stencils imports
	The namespace will be available in all templates which are imported 
-->
<#import "project.ftl" as project />
<#import "base.ftl" as base />
<#import "curator.ftl" as curator />
<#import "tabs.ftl" as tabs />
<#import "facets.ftl" as facets />
<#import "browse_mode.ftl" as browse_mode />
<#import "contextual_navigation.ftl" as contextual_navigation />
<#import "history_cart.ftl" as history_cart />
<#import "auto_complete.ftl" as auto_complete />
<#import "curator.ftl" as curator />
<#import "extra_search.ftl" as extra_search />
<#import "results.ftl" as results />
<#import "client_includes.ftl" as client_includes />

<#-- Specific result styling imports
	These imports are required for the automatic template selection to work
	The various namespaces (e.g. 'video', 'facebook') need to be on the main scope 
-->
<#import "project.ftl" as project />
<#import "courses.ftl" as courses />
<#import "programs.ftl" as programs />
<#import "people.ftl" as people />
<#import "video.ftl" as video />
<#import "facebook.ftl" as facebook />
<#import "events.ftl" as events />
<#import "twitter.ftl" as twitter />
<#import "instagram.ftl" as instagram />

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<meta name="robots" content="nofollow,noindex">

	<@client_includes.HTMLHeader />
	
	<#if (question.query)!?has_content>
		<title>${question.query!},&nbsp;<@s.cfg>service_name</@s.cfg></title>
	<#else>
		<title><@s.cfg>service_name</@s.cfg></title>
	</#if> 

</head>
<body>
	<a href="#search-results" class="sr-only" title="Skip to search results">
		Skip to search results
	</a>
	<@base.Overlay />
	<@client_includes.ContentHeader />

	<div class="fb-container">
		<main class="main <@s.InitialFormOnly>initial-search-form</@s.InitialFormOnly>" role="main">
			<@project.SearchForm />
			<@s.AfterSearchOnly>
				<@project.Tabs />
				 <#-- 
				 	Would normally merge the span with the section element but due to the way sessions hide/show functionalty works, 
				 	we need to separate this into it own element. -->
				<span id="search-facets-and-results" >
					<section class="content-wrapper content-wrapper--col search-facets-and-results">
						<@project.SideNavigation />
						<@project.Results />
					</section>
				</span>
			</@s.AfterSearchOnly>
			<section class="content-wrapper search-sessions">
				<@history_cart.SearchHistory />
				<@history_cart.Cart />
			</section>
		</main>
	</div>    

	<@client_includes.ContentFooter />

	<#-- Third parties -->
	<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js" integrity="sha512-bLT0Qm9VnAYZDflyKcBaQ2gg0hSYNQrJ8RilYldYQ1FxQYoCLtUjuuRuZo+fjqhx/qtq/1itJ0C2ejDxltZVFg==" crossorigin="anonymous"></script>	
	<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.3/umd/popper.min.js" integrity="sha512-hJSZLjaUow3GsiAkjUBMxN4eaFysMaBvg7j6mkBeo219ZGmSe1eVhKaJJAj5GzGoD0j0Gr2/xNDzjeecdg+OCw==" crossorigin="anonymous"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/typeahead.js/0.11.1/typeahead.bundle.min.js" integrity="sha512-qOBWNAMfkz+vXXgbh0Wz7qYSLZp6c14R0bZeVX2TdQxWpuKr6yHjBIM69fcF8Ve4GUX6B6AKRQJqiiAmwvmUmQ==" crossorigin="anonymous"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.7.6/handlebars.min.js" integrity="sha512-zT3zHcFYbQwjHdKjCu6OMmETx8fJA9S7E6W7kBeFxultf75OPTYUJigEKX58qgyQMi1m1EgenfjMXlRZG8BXaw==" crossorigin="anonymous"></script>

	<#-- 
		Libraries required by the design developed by the Stencils cutup team. 
		Avoid changing these if possible.
	-->
	<#-- Stencil specific code such as the quickview and dropdowns -->
	<script type="text/javascript" src="/s/resources/${question.collection.id}/${question.profile}/js/main.js"></script>
	
	<#-- Stencils specific code -->
	<script src="/s/resources/${question.collection.id}/${question.profile}/js/stencils.js"></script> 
	<script src="/s/resources/${question.collection.id}/${question.profile}/js/handlebars-helpers.js"></script> 
		
	<#-- Funnelback auto-complete -->
	<script src="/s/resources/${question.collection.id}/${question.profile}/js/funnelback.autocompletion-2.6.0.stencils.js"></script>


	<#-- Output the auto complete templates for concierge -->
	<@programs.AutoCompleteTemplate />
	<@people.AutoCompleteTemplate />
		
	<script>
		window.addEventListener('DOMContentLoaded', function() {			
			setupDeferredImages();
			<@auto_complete.Configuration />				
			
			// Make the history button accessible via the keyboard for WCAG 2.1
			var historyElement = document.querySelectorAll('.session-history-toggle');

			// Add a href which does not reference any valid anchor so that 
			// hitting enter while the element is in focus will activate
			// the onclick event
			historyElement.forEach((element) => {
				element.setAttribute("href", "#fb-history-placeholder");
			});
		});
	</script>

	<#-- 
		Enable session functonality which includes cart and click 
		and query history 
	-->
	<#if question.collection.configuration.valueAsBoolean("ui.modern.session")>
		<#-- 
			Automatically includ the cart template for all document types defined
			across available namespaces. i.e. You won't need to explicitly 
			do calls like <@courses.CartTemplate> to include the Handlebars templates 
			as this macro will automatically be include it for you.   
		-->
		<@history_cart.CartTemplatesForResults />
		
		<#-- Specifies how each cart item should be presented -->
		<@history_cart.CartTemplate />
		

		<script nomodule src="https://cdn.jsdelivr.net/npm/es6-promise@4/dist/es6-promise.auto.min.js"></script>
		
		<#-- We have replaced the products session code with an extended version for Stencils -->
		<#if question.profile?contains("_preview")>
			<#-- 
				Use the non-minified version for the preview so that 
				it is easier to step through and investigate bugs 
			-->
			<script defer src="/s/resources/${question.collection.id}/${question.profile}/js/funnelback.session-cart-0.1.js"></script>
			<script defer src="/s/resources/${question.collection.id}/${question.profile}/js/funnelback.session-history-0.1.js"></script>
		<#else>
			<script type="module" defer src="/s/resources/${question.collection.id}/${question.profile}/js/funnelback.session-cart-0.1.module.min.js"></script>
      		<script nomodule defer src="/s/resources/${question.collection.id}/${question.profile}/js/funnelback.session-cart-0.1.legacy.min.js"></script>
			<script defer src="/s/resources/${question.collection.id}/${question.profile}/js/funnelback.session-history-0.1.min.js"></script>
		</#if>
		<@history_cart.Configuration />
	</#if>
</body>
</html>
