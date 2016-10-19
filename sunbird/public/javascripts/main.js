const RESTcall = (method, url, content, success, failure) => {
  let xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function() {
    if (xhr.status === 200) {
      if(!!success) {
        success();
      }
    }
    else {
      if(!!failure) {
        failure(xhr.status);
      }
    }
  };
  switch(method.trim().toUpperCase()) {
    case "GET": xhr.send(); break;
    case "DELETE": xhr.send(); break;
    case "POST": xhr.send(content); break;
    case "PUT": xhr.send(content); break;
    default: break;
  }
  
}

const realod = () => {
  window.location.reload();
}

const logError = (value) => {
  console.log(value);
}