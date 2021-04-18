const api_host = 'http://127.0.0.1:5000/site/';
let content = document.getElementById('content');
let site_url = document.getElementById('site_url');

function getPage() {
  browser.tabs.query({currentWindow: true, active: true})
    .then((tabs) => {
      let full_url = tabs[0].url;
      let url = new URL(full_url).hostname;
      let api_request_url = api_host + url;
      site_url.innerHTML = api_request_url;
      return api_request_url;
    })
    .then(async function getOpenWPM(api_request_url){
      const response = await fetch(api_request_url);
      const data = await response.json();
      document.getElementById('javasscript_cookies').innerHTML = data['javasscript_cookies']['count'];
      document.getElementById('hosts').innerHTML = `
      ${data.javasscript_cookies.hosts.map(function(item){
        return `
        <div class= "hosts">
          ${item}
        </div>
        `
      }).join('')}
      `;
      document.getElementById('redirect_count').innerHTML = data['http_redirects']['count'];
      document.getElementById('redirects').innerHTML = `
      ${data.http_redirects.redirects.map(function(item){
        return `
        <div class= "redirects">
          ${item}
        </div>
        `
      }).join('')}
      `;

    })
  }

getPage()
