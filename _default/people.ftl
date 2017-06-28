<#ftl encoding="utf-8" output_format="HTML" />
<#import "/share/stencils/libraries/base/base.ftl" as base />
<#import "/share/stencils/libraries/base/history_cart.ftl" as history_cart />

<#macro Result result>
  <li class="search-result search-result-people">
    <div class="card">

      <div class="row no-gutters">

        <div class="col-md-2 my-auto">
          <#if result.metaData["I"]??>
            <img class="img-fluid rounded-circle" alt="Thumbnail for ${result.title}" src="<@base.MultiValuedMetadataDisplayFirst metadata=result.metaData["I"]! />">            
          <#else>
            <div class="text-center">
              <span class="fa fa-user"></span>
            </div>
          </#if>
        </div>

        <div class="col-md-10">
          <div class="card-block">

            <div class="card-title">
              <div class="float-right">
                <@history_cart.LastVisitedLink result=result/>
              </div>
              <h4>
                <a href="${result.clickTrackingUrl}" title="${result.liveUrl}">
                  <@s.boldicize><@s.Truncate length=70>${result.metaData["peopleFirstName"]!} ${result.metaData["peopleLastName"]!}</@s.Truncate></@s.boldicize>
                </a>
              </h4>
              <div class="card-subtitle">
                <h5><@s.boldicize><@base.MultiValuedMetadataDisplay metadata=result.metaData["peoplePosition"]! /></@s.boldicize></h5>            
              </div>
              <div class="card-subtitle text-muted">
                <@s.boldicize><@base.MultiValuedMetadataDisplay metadata=result.metaData["peopleDepartment"]! /></@s.boldicize>
              </div>
            </div>

            <div class="card-text">
              <div class="row">
                <div class="col-md-6">
                  <span class="fa fa-envelope-o text-muted"></span>
                  <a class="text-muted" href="mailto:${result.metaData["peopleEmail"]!}">${result.metaData["peopleEmail"]!}</a>
                </div>
                <div class="col-md-2">
                  <span class="fa fa-phone text-muted"></span>
                  <a class="text-muted" href="tel:${result.metaData["peoplePhone"]!}">${result.metaData["peoplePhone"]!}</a>
                </div>
                <div class="col-md-4">
                  <span class="fa fa-map-marker text-muted"></span>
                  <a class="text-muted" href="https://maps.google.com/?q=${result.metaData["peopleLocation"]!?url}" target="_blank">${result.metaData["peopleLocation"]!}</a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </li>
</#macro>
<#-- vim: set expandtab ts=2 sw=2 sts=2 :-->