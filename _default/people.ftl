<#ftl encoding="utf-8" output_format="HTML" />
<#import "base.ftl" as base />
<#import "history_cart.ftl" as history_cart />

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
          <div class="card-body">

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
                <div class="col-md-5">
                  <span class="fa fa-envelope-o text-muted"></span>
                  <a class="text-muted" href="mailto:${result.metaData["peopleEmail"]!}">${result.metaData["peopleEmail"]!}</a>
                </div>
                <#if result.metaData["peoplePhone"]??>
                  <div class="col-md-3">
                    <span class="fa fa-phone text-muted"></span>
                    <a class="text-muted" href="tel:${result.metaData["peoplePhone"]!}">${result.metaData["peoplePhone"]!}</a>
                  </div>
                </#if>
                <#if result.metaData["peopleLocation"]??>
                  <div class="col-md-4">
                    <span class="fa fa-map-marker text-muted"></span>
                    <a class="text-muted" href="https://maps.google.com/?q=${result.metaData["peopleLocation"]!?url}" target="_blank">${result.metaData["peopleLocation"]!}</a>
                  </div>
                </#if>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </li>
</#macro>

<#macro AutoCompleteTemplate>
  <script id="auto-completion-people" type="text/x-handlebar-template">
    <div class="media">
      {{#if extra.disp.image}}
        <img class="d-flex mr-3 rounded-circle" src="{{extra.disp.image}}" alt="{{extra.disp.title}}" />
      {{/if}}
      <div class="media-body">
        <h6>{{extra.disp.title}}</h6>
        <div>{{extra.disp.position}}</div>
        <div class="details text-muted">
          {{#if extra.disp.department}}<div><small><span class="fa fa-university text-muted" aria-hidden="true"></span> {{extra.disp.department}}</small></div>{{/if}}
          {{#if extra.disp.phone}}<div><small><span class="fa fa-phone text-muted" aria-hidden="true"></span> {{extra.disp.phone}}</small></div>{{/if}}
          {{#if extra.disp.email}}<div><small><span class="fa fa-envelope-o text-muted" aria-hidden="true"></span> {{extra.disp.email}}</small></div>{{/if}}
        </div>
      </div>
    </div>
  </script>
</#macro>

<#-- vim: set expandtab ts=2 sw=2 sts=2 :-->
