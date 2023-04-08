// Import MaterialApp and other widgets which we can use to quickly create a material app
import 'package:flutter/material.dart';

// Code written in Dart starts executing from the main function. runApp is part of
// Flutter, and requires the component which will be our app's container. In Flutter,
// every component is known as a "widget".
//main() is the entry point of the app, and it calls runApp() to start the app and pass in the top-level widget (TodoApp) as the main container
void main() => runApp(new TodoApp());

// Every component in Flutter is a widget, even the whole app itself
//TodoApp is a StatelessWidget, meaning it won't change throughout the lifecycle of the app. It returns a MaterialApp widget, which is the top-level container for
//the app and provides basic layout structure

class TodoApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return new MaterialApp(
      title: 'Todo List',
      home: new TodoList()
    );
  }
}

/////////////////////////////////////////

class TodoList extends StatefulWidget {
  @override
  createState() => new TodoListState();
}

class TodoListState extends State<TodoList> {
//This is a stateful class for a TodoList widget. It manages the state of the TodoList and provides methods to add and remove Todo items from the list.
//The class also includes a method to prompt the user to mark a Todo item as done and remove it from the list.
  List<String> _todoItems = []; //holds the Todo items and is initially empty

  void _addTodoItem(String task) {
    // Only add the task if the user actually entered something
    //adds a new Todo item to the list only if the user has entered a task
    if(task.length > 0) {
      // Putting our code inside "setState" tells the app that our state has changed, and
      // it will automatically re-render the list
      setState(() => _todoItems.add(task));
    }
  }

  void _removeTodoItem(int index) {
  //removes a Todo item at a given index
    setState(() => _todoItems.removeAt(index));
  }

  void _promptRemoveTodoItem(int index) {
  //creates an alert dialog to confirm that the user wants to remove the Todo item at a given index
  //in the old code, used FaceButtons, which no longer are supported by Flutter. So I changed them to TextButtons
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return new AlertDialog(
          title: new Text('Mark "${_todoItems[index]}" as done?'),
          actions: <Widget>[
            new TextButton(
              child: new Text('CANCEL'),
              // The alert is actually part of the navigation stack, so to close it, we
              // need to pop it.
              onPressed: () => Navigator.of(context).pop()
            ),
            new TextButton(
              child: new Text('MARK AS DONE'),
              onPressed: () {
                _removeTodoItem(index);
                Navigator.of(context).pop();
              }
            )
          ]
        );
      }
    );
  }

  // Build the whole list of todo items
  Widget _buildTodoList() {
  //builds a ListView widget that displays all the Todo items in the list
    return new ListView.builder(
      itemBuilder: (context, index) {
        // itemBuilder will be automatically be called as many times as it takes for the
        // list to fill up its available space, which is most likely more than the
        // number of todo items we have. So, we need to check the index is OK.
        if(index < _todoItems.length) {
          return _buildTodoItem(_todoItems[index], index);
        }
      },
    );
  }

  // Build a single todo item
  Widget _buildTodoItem(String todoText, int index) {
  //builds a ListTile widget that displays a single Todo item with its title and enables the user to mark it as done by tapping on it
    return new ListTile(
      title: new Text(todoText),
      onTap: () => _promptRemoveTodoItem(index)
    );
  }

  @override
  Widget build(BuildContext context) {
  //builds the TodoList widget by creating a Scaffold widget with an AppBar and a body containing the ListView widget built by the _buildTodoList method
  //includes a FloatingActionButton to add new Todo items by calling the _pushAddTodoScreen method
    return new Scaffold(
      appBar: new AppBar(
        title: new Text('Todo List')
      ),
      body: _buildTodoList(),
      floatingActionButton: new FloatingActionButton(
        onPressed: _pushAddTodoScreen,
        tooltip: 'Add task',
        child: new Icon(Icons.add)
      ),
    );
  }

  void _pushAddTodoScreen() {
    // Push this page onto the stack
    //creates a new screen to add a new Todo item by pushing a new MaterialPageRoute onto the navigation stack
    //the new screen includes a TextField widget for the user to enter the new task
    Navigator.of(context).push(
      // MaterialPageRoute will automatically animate the screen entry, as well as adding
      // a back button to close it
      new MaterialPageRoute(
        builder: (context) {
          return new Scaffold(
            appBar: new AppBar(
              title: new Text('Add a new task')
            ),
            body: new TextField(
              autofocus: true,
              onSubmitted: (val) {
                _addTodoItem(val);
                //called when the user submits the new task
                Navigator.pop(context); // Close the add todo screen
              },
              decoration: new InputDecoration(
                hintText: 'Enter something to do...',
                contentPadding: const EdgeInsets.all(16.0)
              ),
            )
          );
        }
      )
    );
  }
}
