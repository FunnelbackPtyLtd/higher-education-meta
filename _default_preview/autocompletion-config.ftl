<#ftl encoding="utf-8" output_format="HTML" />
<#import "people.ftl" as people />
<#import "courses.ftl" as courses />
<#import "project.ftl" as project />
<#import "/web/templates/modernui/funnelback_classic.ftl" as s/>

<!DOCTYPE html>
<html lang="en">
<head>
<title>Autocomplete configuration for ${question.collection.configuration.value("group.project_id")!}</title>
<style>
/* Basic styling for code snippets */
pre {
    background: #f4f4f4;
    border: 1px solid #ddd;
    border-left: 3px solid #f36d33;
    color: #666;
    page-break-inside: avoid;
    font-family: monospace;
    font-size: 15px;
    line-height: 1.6;
    margin-bottom: 1.6em;
    max-width: 100%;
    overflow: auto;
    padding: 1em 1.5em;
    display: block;
    word-wrap: break-word;
}
</style>
</head>
<body>

<h1>Autocomplete configuration</h1>

<h2>CSS</h2>
<p>The following CSS file should be included in the &lt;head&gt; of the document. Note that you may need to do additional styling in order to make it work with the rest of the page.</p>

<pre>&lt;link rel=&quot;stylesheet&quot; type=&quot;text/css&quot; href=&quot;https://${question.environmentVariables["HTTP_HOST"]}/s/resources/${question.collection["id"]}/css/customer-typeahead.css&quot;&gt;</pre>

<h2>Javascript</h2>
<p>The following Javascript dependencies should be included at the end of the &lt;body&gt;</p>

<p>The following scripts have a dependency on jQuery. The autocompletion has been tested on version 3.x.x, however, is theoretically compatible with version 1.10.2+. Ensure to check for any jQuery errors in the browser console.</p>
Handlebars is used to render client-side templates.
<pre>&lt;script src=&quot;https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.0.5/handlebars.min.js&quot;&gt;&lt;/script&gt;</pre>
Typeahead handles sending the asynchronous HTTP requests on keystroke with debouncing and caching.
<pre>&lt;script src=&quot;https://${question.environmentVariables["HTTP_HOST"]}/stencils/resources/autocompletion/js/typeahead.bundle-0.11.1.min.js&quot;&gt;&lt;/script&gt;</pre>
typeahead-fb activates the Typeahead library in the context of the search page.
<pre>&lt;script src=&quot;https://${question.environmentVariables["HTTP_HOST"]}/s/resources/${question.collection["id"]}/_default/js/typeahead.fb-2.6.js&quot;&gt;&lt;/script&gt;</pre>

<p>The following Javascript snippets should be included at the end of the &lt;body&gt;, below the dependencies.</p>

<#assign peopleSnippet>
    <@people.AutoCompleteTemplate />
</#assign>

<#assign coursesSnippet>
    <@courses.AutoCompleteTemplate />
</#assign>

<#assign configSnippet>
    <@project.AutoComplete />
</#assign>

<pre>${peopleSnippet?markup_string}</pre>
<pre>${coursesSnippet?markup_string}</pre>
<p>In the snippet below, the #query must be replaced with a CSS selector that targets the &lt;input&gt; element in your search bar. For example, if your &lt;input&gt; has an id of "search-input", then replace #query with #search-input
<pre>&lt;script&gt;<br>${configSnippet?markup_string?replace("suggest.json", "https://" + question.environmentVariables["HTTP_HOST"] + "/s/suggest.json")}<br>&lt;/script&gt;</pre>


</body>
</html>