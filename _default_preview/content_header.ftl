<#ftl encoding="utf-8" output_format="HTML" />

<nav class="navbar navbar-toggleable-md navbar-inverse bg-inverse">
  <h1 class="sr-only">Toolbar</h1>

  <div class="collapse navbar-collapse">
    <ul class="navbar-nav mr-auto">
        <li class="nav-item"><a class="nav-link" href="#">About</a></li>
        <li class="nav-item"><a class="nav-link" href="#">Jobs</a></li>
        <li class="nav-item"><a class="nav-link" href="#">Newsroom</a></li>
        <li class="nav-item"><a class="nav-link" href="#">Giving to FBU</a></li>
    </ul>
    <ul class="navbar-nav">
        <li class="nav-item"><a class="nav-link" href="#"><span class="fa fa-graduation-cap"></span> Alumni</a></li>
        <li class="nav-item"><a class="nav-link" href="#"><span class="fa fa-users"></span> My FBU</a></li>
        <li class="nav-item"><a class="nav-link" href="#"><span class="fa fa-book"></span> Library</a></li>
        <li class="nav-item"><a class="nav-link" href="#"><span class="fa fa-search"></span><span class="sr-only">Search</span></a></li>
    </ul>
  </div>
</nav>

<nav class="navbar navbar-toggleable-md customer">
  <h1 class="sr-only">Main menu</h1>
  <div class="container">
    <a class="navbar-brand" href="#">
      <img src="${ContextPath}/resources/${question.collection.id}/${question.profile}/img/brand.png" alt="Funnelback University">
    </a>
    <ul class="navbar-nav">
      <li class="nav-item customer-study"><a class="nav-link" href="#">Study at FBU</a></li>
      <li class="nav-item customer-research"><a class="nav-link" href="#">Research &amp; Innovation</a></li>
      <li class="nav-item customer-community"><a class="nav-link" href="#">Industry &amp; Community</a></li>
    </ul>
  </div>
</nav>
<#-- vim: set expandtab ts=2 sw=2 sts=2 :-->
