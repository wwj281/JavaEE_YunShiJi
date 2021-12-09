<template>
    <div class="test-div"></div>
</template>

<script>
</script>

<style>
    .test-div{
        position: relative;  /*日常相对定位*/
        width:150px;
        height:36px;
        border-radius:5px;
        border:black 1px solid;
        background: rgba(245,245,245,1)
    }
    .test-div:before{
        content: "";  /*:before和:after必带技能，重要性为满5颗星*/
        display: block;
        position: absolute;  /*日常绝对定位*/
        top:8px;
        width: 0;
        height: 0;
        border:6px solid transparent;
        left:-12px;
        border-right-color: rgba(245,245,245,1);
    }
  </style>
  