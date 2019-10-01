<#ftl encoding="utf-8" output_format="HTML" />
<#import "base.ftl" as base />
<#import "history_cart.ftl" as history_cart />

<#macro Result result>
  <li class="search-result search-result-people mb-3">
    <div class="card">

      <div class="row no-gutters">

        <div class="col-md-2 text-center my-auto pl-3">
          <#if result.metaData["image"]??>
            <img class="img-fluid rounded-circle" alt="Thumbnail for ${result.title}" src="<@base.MultiValuedMetadataDisplayFirst metadata=result.metaData["image"]! />">            
          <#else>
            <div class="text-center">
              <span class="fas fa-user"></span>
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
                  <span class="far fa-fw fa-envelope text-muted"></span>
                  <a class="text-muted" href="mailto:${result.metaData["peopleEmail"]!}">${result.metaData["peopleEmail"]!}</a>
                </div>
                <#if result.metaData["peoplePhone"]??>
                  <div class="col-md-3">
                    <span class="fas fa-fw fa-phone text-muted"></span>
                    <a class="text-muted" href="tel:${result.metaData["peoplePhone"]!}">${result.metaData["peoplePhone"]!}</a>
                  </div>
                </#if>
                <#if result.metaData["peopleLocation"]??>
                  <div class="col-md-4">
                    <span class="fas fa-fw fa-map-marker-alt text-muted"></span>
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
      {{#if extra.disp.metaData.image}}
        <img class="d-flex mr-3 rounded-circle" src="{{extra.disp.metaData.image}}" alt="{{extra.disp.title}}" />
      {{/if}}
      <div class="media-body">
        <h6>{{extra.disp.metaData.peopleFirstName}} {{extra.disp.metaData.peopleLastName}}</h6>
        <div>{{extra.disp.metaData.peoplePosition}}</div>
        <div class="details text-muted">
          {{#if extra.disp.metaData.peopleDepartment}}<div><small><span class="fas fa-fw fa-university text-muted" aria-hidden="true"></span> {{extra.disp.metaData.peopleDepartment}}</small></div>{{/if}}
          {{#if extra.disp.metaData.peoplePhone}}<div><small><span class="fas fa-fw fa-phone text-muted" aria-hidden="true"></span> {{extra.disp.metaData.peoplePhone}}</small></div>{{/if}}
          {{#if extra.disp.metaData.peopleEmail}}<div><small><span class="far fa-fw fa-envelope text-muted" aria-hidden="true"></span> {{extra.disp.metaData.peopleEmail}}</small></div>{{/if}}
        </div>
      </div>
    </div>
  </script>
</#macro>

<#-- vim: set expandtab ts=2 sw=2 sts=2 :-->
