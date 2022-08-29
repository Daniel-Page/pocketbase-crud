window.onload = function() {
  loadEntries();
};

const loadEntries = async () => {
  const client = new PocketBase('http://127.0.0.1:8090');

  const records = await client.records.getFullList('posts', 200 /* batch size */, {
    sort: '-created',
  });

  var textbox = ""
  for (let i=0;i<records.length;i++) {
    textbox += "<div style='padding: 10px 0px 0px 0px; text-align: left'>";
    textbox += "<button class='btn btn-primary btn-sm btn-danger' onClick=deleteEntry(" + i + ")>Delete</button>";
    textbox += "&nbsp&nbsp";
    textbox += "<button class='btn btn-primary btn-sm btn-warning' onClick=editEntry(" + i + ")>Update</button>";
    textbox += "&nbsp&nbsp";
    textbox += records[i].field;
    textbox += "</div>";
  }

  document.getElementById("buttons").innerHTML = textbox;
}

const createEntry = async () => {
  const client = new PocketBase('http://127.0.0.1:8090');
  const data = { "field": document.getElementById("entryText").value };
  const record = await client.records.create('posts', data);
  document.getElementById("entryText").value = "";
  loadEntries();
  document.getElementById("entryText").focus().select();
}

const deleteEntry = async (item) => {
  const client = new PocketBase('http://127.0.0.1:8090');

  const records = await client.records.getFullList('posts', 200 /* batch size */, {
    sort: '-created',
  });

  await client.records.delete('posts', records[item].id);
  loadEntries();
}

const editEntry = async (item) => {
  const client = new PocketBase('http://127.0.0.1:8090');

  const records = await client.records.getFullList('posts', 200 /* batch size */, {
    sort: '-created',
  });
  
  const data = { "field": document.getElementById("entryText").value };
  const record = await client.records.update('posts', records[item].id, data);
  document.getElementById("entryText").value = "";
  loadEntries();
  document.getElementById("entryText").focus().select();
}