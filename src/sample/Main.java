package sample;

import javafx.application.Application;
import javafx.application.Platform;
import javafx.concurrent.Task;
import javafx.scene.Scene;
import javafx.scene.input.KeyEvent;
import javafx.scene.layout.*;
import javafx.scene.transform.Rotate;
import javafx.stage.Stage;

import static javafx.scene.input.KeyCode.Q;

public class Main extends Application {


    public static final int blocksize=32;
    public static Block curr_this;
    public static Block curr_other;
    public static Pane bottom=new Pane();

    @Override
    public void start(Stage stage) throws Exception{
        //Parent root = FXMLLoader.load(getClass().getResource("sample.fxml"))

        Pane parent=new Pane();

        bottom.getChildren().addAll(new Pixel(0,21),
                                    new Pixel(1,21),
                                    new Pixel(2,21),
                                    new Pixel(3,21),
                                    new Pixel(4,21),
                                    new Pixel(5,21),
                                    new Pixel(6,21),
                                    new Pixel(7,21),
                                    new Pixel(8,21),
                                    new Pixel(9,21)
                                    );

        Task<Void> runner_this = new Task<Void>() {
            @Override
            protected Void call() throws Exception {

                Platform.runLater(()->{
                    curr_this=new Block(stage,parent);
                    parent.getChildren().add(curr_this);
                });

                while(true){
                    Platform.runLater(()->{
                        Main.curr_this.move(2);
                        if(!Main.curr_this.checkIntersection())
                            Main.curr_this=new Block(stage,parent);
                    });
                    Thread.sleep(200);
                }
            }
        };
        new Thread(runner_this).start();

        parent.getChildren().add(bottom);

        Scene scene=new Scene(parent, Main.blocksize*10, Main.blocksize*22);
        scene.addEventHandler(KeyEvent.KEY_PRESSED, (key) -> {
            switch (key.getCode()){
                case Q:
                    System.err.println("Q pressed");
                    curr_this.move(0);
                    break;
                case E:
                    System.err.println("E pressed");

                    curr_this.move(1);
                    break;
            }
        });


        stage.setTitle("Hello World");
        stage.setScene(scene);
        stage.show();
    }


    public static void main(String[] args) {
        launch(args);
    }
}