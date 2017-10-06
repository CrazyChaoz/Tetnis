package sample;

import javafx.application.Application;
import javafx.scene.Scene;
import javafx.scene.layout.*;
import javafx.stage.Stage;

public class Main extends Application {

    public static Pane curr;
    public static final int blocksize=32;
    @Override
    public void start(Stage stage) throws Exception{
        //Parent root = FXMLLoader.load(getClass().getResource("sample.fxml"))

        Pane parent=new Pane();
        parent.getChildren().add(new Block(stage,parent));

        stage.setTitle("Hello World");
        stage.setScene(new Scene(parent, Main.blocksize*10, Main.blocksize*22));
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