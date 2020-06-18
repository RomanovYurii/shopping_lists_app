# Shopping Lists App
React Native application made as a test task during recruitment process

## Concept:

Create a simple Shopping list app where you can create new shopping list and add items to buy.

## Requirements:

- App should consist of three views:

  * list of current shopping lists,

  * list of archived shopping lists,

  * shopping list details where you can add/delete items etc.

Please notice that those operations should be only possible when list isn’t archived.

- Use any type of storage to store apps’ data - data should be persisted.

- Lists should be sorted by date.

- Use ​https://github.com/react-native-training/react-native-elements​ or https://github.com/GeekyAnts/NativeBase​ for styling the elements.

- App should work at least for one platform.

#

## Planned list of features made after analyzing the task

### 1. Home screen
 - If no lists or no active lists are in the storage, show template
 - Else show selected list

### 2. Active lists
 - If no lists or no active lists are in the storage, show template
 - Else show array of lists
 - Selected list is highlighted
 - On right swipe possible to delete or archive
  * When chosen selected, the most recent list becomes selected
 - On left swipe possible to set selected

### 3. Archived lists
 - If no lists or no active lists are in the storage, show template
 - On right swipe possible to delete
 - On left swipe possible to restore
