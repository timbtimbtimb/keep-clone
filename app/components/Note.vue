<script>
export default {
  props: {
    title: String,
    column: Number
  }
}
</script>

<template>
  <div class="Note">
    <div>
      <div class="content">
        <h1>{{ title }}</h1>
        <p>
          <slot></slot>
        </p>
      </div>
      <div class="buttons">
        <ImageButton icon="add-alert" title="New list" />
        <ImageButton icon="add-person" title="New list" />
        <ImageButton icon="palette" title="New note with drawing" />
        <ImageButton icon="archive" title="New note with image" />
        <ImageButton icon="vertical-dots" title="New note with image" />
      </div>
    </div>
  </div>
</template>

<style>
.Note {
  width: 250px;
  padding: 0.5rem;
  cursor: default;
}

.Note>div {
  border: 1px solid #d9d9d9;
  border-radius: 0.8rem;
  padding: 1rem 1rem 1rem 1rem;
  display: flex;
  gap: 1rem;
  flex-direction: column;
}

.Note:hover>div {
  box-shadow: 0px 1px 3px #b1b1b1;
}

.Note h1 {
  font-size: 1.5rem;
  font-weight: normal;
  display: block;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.Note p {
  font-size: 1.1rem;
}

.Note .content {
  flex-grow: 1;
  gap: 1rem;
  display: flex;
  flex-direction: column;
}

.Note .buttons {
  flex-shrink: 0;
  align-items: center;
  height: 2.5rem;
  padding: 0;
  display: flex;
  opacity: 0;
  transition-property: opacity;
  transition-duration: 300ms;
  justify-content: space-between;
}

.Note:hover .buttons {
  opacity: 1;
}

.Note .buttons button {
  text-align: right;
  font-size: 1.1rem;
  font-weight: 600;
  color: rgb(75, 75, 75);
  border-radius: 3px;
  text-align: center;
  padding: 0.75rem 2rem 0.75rem 2rem;
  margin-left: auto;
  cursor: pointer;
  flex-shrink: 0;
}

.Note .buttons button:hover {
  background-color: var(--hover-gray)
}
</style>