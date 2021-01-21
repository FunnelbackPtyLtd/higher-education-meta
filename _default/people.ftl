<#ftl encoding="utf-8" output_format="HTML" />
<#import "base.ftl" as base />
<#import "history_cart.ftl" as history_cart />

<#macro Result result>
  <li class="search-result search-result-people mb-3">
    <div class="card">

      <div class="row no-gutters">

        <div class="col-md-2 text-center my-auto pl-3">
          <#if result.listMetadata["image"]!?has_content>
            <img class="img-fluid" alt="Thumbnail for ${result.title}" src="${result.listMetadata["image"]?first!}">
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
                  <@s.boldicize><@s.Truncate length=70>${result.listMetadata["peopleFirstName"]?first!} ${result.listMetadata["peopleLastName"]?first!}</@s.Truncate></@s.boldicize>
                </a>
              </h4>
              <div class="card-subtitle">
                <#if result.listMetadata["peoplePosition"]!?has_content>
                  <h5><@s.boldicize>${result.listMetadata["peoplePosition"]?join(", ")}</@s.boldicize></h5>            
                </#if>
              </div>
              <div class="card-subtitle text-muted">
                <#if result.listMetadata["peopleDepartment"]!?has_content>
                  <@s.boldicize>${result.listMetadata["peopleDepartment"]?join(", ")}</@s.boldicize>
                </#if>
              </div>
            </div>

            <div class="card-text">
              <div class="row">
                <div class="col-md-5">
                  <span class="far fa-fw fa-envelope text-muted"></span>
                  <a class="text-muted" href="mailto:${result.listMetadata["peopleEmail"]?first!}">${result.listMetadata["peopleEmail"]?first!}</a>
                </div>
                <#if result.listMetadata?keys?seq_contains("peoplePhone")>
                  <div class="col-md-3">
                    <span class="fas fa-fw fa-phone text-muted"></span>
                    <a class="text-muted" href="tel:${result.listMetadata["peoplePhone"]?first!}">${result.listMetadata["peoplePhone"]?first!}</a>
                  </div>
                </#if>
                <#if result.listMetadata?keys?seq_contains("peopleLocation")>
                  <div class="col-md-4">
                    <span class="fas fa-fw fa-map-marker-alt text-muted"></span>
                    <a class="text-muted" href="https://maps.google.com/?q=${result.listMetadata["peopleLocation"]?first!?url}" target="_blank">${result.listMetadata["peopleLocation"]?first!}</a>
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
      {{#if extra.disp.listMetadata.image.[0]}}
        <img class="d-flex mr-3 rounded-circle" src="{{extra.disp.listMetadata.image.[0]}}" alt="{{extra.disp.title}}" />
      {{/if}}
      <div class="media-body">
        <h6>{{extra.disp.listMetadata.peopleFirstName.[0]}} {{extra.disp.listMetadata.peopleLastName.[0]}}</h6>
        <div>{{extra.disp.listMetadata.peoplePosition.[0]}}</div>
        <div class="details text-muted">
          {{#if extra.disp.listMetadata.peopleDepartment.[0]}}<div><small><span class="fas fa-fw fa-university text-muted" aria-hidden="true"></span> {{extra.disp.listMetadata.peopleDepartment.[0]}}</small></div>{{/if}}
          {{#if extra.disp.listMetadata.peoplePhone.[0]}}<div><small><span class="fas fa-fw fa-phone text-muted" aria-hidden="true"></span> {{extra.disp.listMetadata.peoplePhone.[0]}}</small></div>{{/if}}
          {{#if extra.disp.listMetadata.peopleEmail.[0]}}<div><small><span class="far fa-fw fa-envelope text-muted" aria-hidden="true"></span> {{extra.disp.listMetadata.peopleEmail.[0]}}</small></div>{{/if}}
        </div>
      </div>
    </div>
  </script>
</#macro>

<#-- vim: set expandtab ts=2 sw=2 sts=2 :-->
