<#ftl encoding="utf-8" output_format="HTML" />

<#--
    Generates a search form for the current collection, passing through the
    relevant parameters like collection, profile, form, scope, ...

    @param preserveTab Boolean indicating if searching via the form should preserve the currently selected tab or not
    @param class Optional <code>class</code> attribute to use on the &lt;form&gt; tag
-->
<#macro SearchForm preserveTab=true class="">
    <!-- hero_banner:SearchForm -->
    <div 
        class="no-wysiwyg hero-banner hero-banner--settings hero-banner--overlay-50 hero-banner--bg-compact hero-banner--undefined                            
        hero-banner-search
        ">
        <div class="hero-banner-wrapper">
            <div class="hero-banner__contents-container">
                <div class="hero-banner__contents">                                        
                    <#-- Concierge currently also contains the logic and markup for the input box -->
                    <@concierge.Concierge />	                    
                    <@sessions.Controls />
                </div>
            </div>
            <img 
                src="/s/resources/default~sp-stencils-resources-meta/showcase/images/university_background-02.png" 
                alt="Alt text description" 
                class="hero-banner__image hero-banner__image--top" 
                srcset="/s/resources/default~sp-stencils-resources-meta/showcase/images/university_background-02.png 1600w,
                        /s/resources/default~sp-stencils-resources-meta/showcase/images/university_background-02.png 1000w,
                        /s/resources/default~sp-stencils-resources-meta/showcase/images/university_background-02.png 800w,
                        /s/resources/default~sp-stencils-resources-meta/showcase/images/university_background-02.png 450w"
            >
        </div>
    </div>
</#macro>