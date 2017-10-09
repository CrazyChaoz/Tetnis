package sample;


import javafx.animation.Animation;
import javafx.animation.KeyFrame;
import javafx.animation.KeyValue;
import javafx.animation.Timeline;
import javafx.beans.binding.BooleanBinding;
import javafx.concurrent.Task;
import javafx.concurrent.WorkerStateEvent;
import javafx.event.ActionEvent;
import javafx.event.EventHandler;
import javafx.event.EventType;
import javafx.scene.Group;
import javafx.scene.Node;
import javafx.scene.Parent;
import javafx.scene.layout.Pane;
import javafx.stage.Stage;
import javafx.util.Duration;

import java.util.Random;


/**
 * Created by testuser on 01.06.2017.
 */
public class Block extends Pane {
    private int position;
    private int shape;
    static final Random rnd=new Random();

    //static IntegerProperty lives=new SimpleIntegerProperty(3);
    //static IntegerProperty score=new SimpleIntegerProperty(0);
    //static BooleanBinding isGameOver=lives.isEqualTo(0);
    //static IntegerBinding level=score.divide(5).add(1);
    static BooleanBinding collision=null;

    public Block(Stage stage,Pane parent) {
        super();
        int i=1;//(rnd.nextInt(50)%3);
        switch (i){
            case 0:
                shape=0;
                this.getChildren().add(new Pixel(3,1));
                this.getChildren().add(new Pixel(4,1));
                this.getChildren().add(new Pixel(5,1));
                this.getChildren().add(new Pixel(6,1));
                stage.show();
                System.out.println(shape);
                break;
            case 1:
                shape=1;
                this.getChildren().add(new Pixel(4,0));
                this.getChildren().add(new Pixel(5,0));
                this.getChildren().add(new Pixel(4,1));
                stage.show();
                System.out.println(shape);
                break;
            case 2:
                shape=99;
                this.getChildren().add(new Pixel(4,0));
                this.getChildren().add(new Pixel(4,1));
                this.getChildren().add(new Pixel(5,0));
                this.getChildren().add(new Pixel(5,1));
                stage.show();
                System.out.println(shape);
                break;
            default:
                System.err.println("wrong shape"+i);
                break;

        }


        while(true){
            Task<Void> sleeper = new Task<Void>() {
                @Override
                protected Void call() throws Exception {
                    try {
                        Thread.sleep(20);
                    } catch (InterruptedException e) {
                    }
                    return null;
                }
            };
            sleeper.setOnSucceeded(event -> {this.move(1);});
            new Thread(sleeper).start();
        }



    }

    public void newBlock(Pane parent, Stage stage){
        parent.getChildren().add(Main.curr = new Block(stage, parent));
    }

    public void move(int movement){

        switch(movement){
            case 0:
                //drehen, + 90°
                switch(shape){
                    case 0:
                        //4 pixel stab - liegend->stehend
                        System.out.println(shape);
                        ((Pixel)this.getChildren().get(0)).move(1,1);
                        ((Pixel)this.getChildren().get(2)).move(-1,-1);
                        ((Pixel)this.getChildren().get(3)).move(-2,-2);
                        shape=10;
                        break;
                    case 1:
                        //quadrat - 1 pixel
                        System.out.println(shape);
                        ((Pixel)this.getChildren().get(1)).move(0,1);
                        shape=11;
                        break;

                    case 10:
                        //4 pixel stab - stehend->liegend
                        System.out.println(shape);
                        ((Pixel)this.getChildren().get(0)).move(-1,-1);
                        ((Pixel)this.getChildren().get(1)).move(0,0);
                        ((Pixel)this.getChildren().get(2)).move(1,1);
                        ((Pixel)this.getChildren().get(3)).move(2,2);
                        shape=0;
                        break;
                    case 11:
                        //quadrat - 1 pixel
                        System.out.println(shape);
                        ((Pixel)this.getChildren().get(0)).move(1,0);
                        shape=12;
                        break;
                    case 12:
                        //quadrat - 1 pixel
                        System.out.println(shape);
                        ((Pixel)this.getChildren().get(2)).move(0,-1);
                        shape=13;
                        break;
                    case 13:
                        //quadrat - 1 pixel
                        System.out.println(shape);
                        ((Pixel)this.getChildren().get(1)).move(0,-1);
                        ((Pixel)this.getChildren().get(0)).move(-1,0);
                        ((Pixel)this.getChildren().get(2)).move(0,1);


                        shape=1;
                        break;
                    case 99:
                        //quadrat - lol
                        System.out.println("turn around  baby");
                        break;
                }
                break;
            case 1:
                switch(shape){
                    case 0:
                        //4 pixel stab - liegend->stehend
                        System.out.println(shape);
                        for(int i=0;i<3;i++)
                            ((Pixel)this.getChildren().get(i)).move(0,1);

                        break;
                    case 1:
                        //quadrat - 1 pixel
                        System.out.println(shape);
                        for(int i=0;i<2;i++)
                            ((Pixel)this.getChildren().get(i)).move(0,1);
                        break;

                    case 10:
                        //4 pixel stab - stehend->liegend
                        System.out.println(shape);
                        for(int i=0;i<3;i++)
                            ((Pixel)this.getChildren().get(i)).move(1,0);
                        break;
                    case 11:
                        //quadrat - 1 pixel
                        System.out.println(shape);
                        for(int i=0;i<2;i++)
                            ((Pixel)this.getChildren().get(i)).move(0,1);
                        break;
                    case 12:
                        //quadrat - 1 pixel
                        System.out.println(shape);
                        for(int i=0;i<2;i++)
                            ((Pixel)this.getChildren().get(i)).move(0,1);
                        break;
                    case 13:
                        //quadrat - 1 pixel
                        System.out.println(shape);
                        for(int i=0;i<2;i++)
                            ((Pixel)this.getChildren().get(i)).move(0,1);
                        break;
                    case 99:
                        //quadrat - lol
                        System.out.println("turn around  baby");
                        break;
                }
                break;
            case 2:
                break;
            case 3:
                break;
        }
    }

    public void rip(Group parent){
        System.err.println("Need impl --> End of game Screen");
        //print msg
    }
}
