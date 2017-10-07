package sample;

import javafx.application.Application;
import javafx.scene.Scene;
import javafx.scene.input.KeyEvent;
import javafx.scene.layout.*;
import javafx.scene.transform.Rotate;
import javafx.stage.Stage;

import static javafx.scene.input.KeyCode.Q;

public class Main extends Application {


    public static final int blocksize=32;
    public static Block curr;
    @Override
    public void start(Stage stage) throws Exception{
        //Parent root = FXMLLoader.load(getClass().getResource("sample.fxml"))

        Pane parent=new Pane();
        curr=new Block(stage,parent);
        Scene scene=new Scene(parent, Main.blocksize*10, Main.blocksize*22);
        scene.addEventHandler(KeyEvent.KEY_PRESSED, (key) -> {
            switch (key.getCode()){
                case Q:
                    System.err.println("Q pressed");
                    curr.move(0);
                    break;
                case E:
                    System.err.println("E pressed");

                    curr.move(0);
                    break;
            }
        });

        parent.getChildren().add(curr);


        stage.setTitle("Hello World");
        stage.setScene(scene);
        stage.show();
    }


    public static void main(String[] args) {
        launch(args);
    }
}
/*
public Node removeNodeByRowColumnIndex(final int row,final int column,GridPane gridPane) {

    ObservableList<Node> childrens = gridPane.getChildren();
    for(Node node : childrens) {
        if(node instanceof ImageView && gridPane.getRowIndex(node) == row && gridPane.getColumnIndex(node) == column) {
            ImageView imageView=ImageView(node); // use what you want to remove
            gridPane.getChildren().remove(imageView);
            break;
        }
    }
}
 */