<script setup>
import { onMounted } from "vue";
import workflow from "../stores/workflow.json";
const startingChoices = workflow["root"];
console.log(startingChoices);


let currentNodeId = "root";




function navigateToNode(nodeId, workflow) {
  let currentNode = workflow[nodeId];

  if (!currentNode) {
    console.error(`Node with id '${currentNodeId}' not found`);
    return;
  }

  document.getElementById("base").innerHTML = "";
  addElements(currentNode.message, "p", "base");

  if (currentNode.last) {
    return;
  }

  if (currentNode.choices) {
    addElements(currentNode.choices, "button", "base");
  }
}


const addElements = (contentList, type, where) => {
  console.log(where);
  let base = document.getElementById(where);
  console.log(base);
  if (type === "button") {
    for (const choice of contentList) {
      let element = document.createElement(type);
      element.innerHTML = choice.name;
      element.className = "btn btn-outline btn-info bottom";
      element.addEventListener("click", function() {
        currentNodeId = choice.id;
        navigateToNode(currentNodeId, workflow);
      });

      base.appendChild(element);
    }
  } else {
    let element = document.createElement(type);
    element.innerHTML = contentList;
    element.className = "chat-bubble chat-bubble-primary";
    let divBot = document.createElement("div");
    divBot.className = "t chat-start";
    base.appendChild(divBot);
    divBot.appendChild(element);
  }
};



onMounted(() => {
  navigateToNode("root", workflow);
});



</script>


<template>
  <div class="fixed bottom-5 left-5 z-50">
    <div class="dropdown dropdown-open dropdown-top dropdown-right">
      <label tabindex="0" class="btn btn-ghost btn-circle avatar online placeholder">
        <div class="bg-neutral-focus text-neutral-content rounded-full w-16">
          <span class="text-xl">CB</span>
        </div>
      </label>
      <div id="base" tabindex="0" class="menu menu-compact dropdown-content w-[32rem] h-[32rem] p-5 shadow bg-base-100 rounded-box w-52">    
      </div>
    </div>
    
  </div>
</template>

