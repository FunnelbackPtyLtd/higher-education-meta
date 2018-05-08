<#-- This file should be replaced by a copy of the Stencils file when
  deploying, to allow customization. Explicitly fail if the collection is not
  the showcase collection. To fix it, copy the file from
  $SEARCH_HOME/share/stencils/libraries/... -->
<#if question.collection.id == 'higher-education-meta'>
  <#include "/share/stencils/libraries/facets/facets.ftl">
<#else>
  <#-- Create a dummy version of a facets.ftl macro, as a way to display
    the error message -->
  <#macro SelectedFacetValues>
    <div class="alert alert-danger">
      <p><code>facets.ftl</code> is currently directly including the Stencils
      file. This is discouraged as Stencils changes will break the collection
      templates. Please make a copy of <code>facets.ftl</code> instead, from the
      Stencils sources (<code>$SEARCH_HOME/share/stencils/libraries/</code>).</p>

      <p>Subsequent template processing will fail until this is fixed.</p>
    </div>
  </#macro>
</#if>
