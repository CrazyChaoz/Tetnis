package Game;


import javafx.beans.property.IntegerProperty;
import javafx.beans.property.SimpleIntegerProperty;
import javafx.scene.Group;
import javafx.scene.Node;
import javafx.scene.layout.Pane;
import javafx.scene.paint.Color;
import javafx.scene.shape.Rectangle;
import javafx.scene.shape.RectangleBuilder;
import javafx.scene.shape.Shape;
import javafx.stage.Stage;

import java.util.Random;


/**
 *
 * Idea
 * make static blocks, move them to nowhere, activate them when necessary
 *
 */



public class Block extends Pane {
    private boolean collided;
    private int shape;
    private static final Random rnd=new Random();
    private static Group killer;

    public IntegerProperty killedLines=new SimpleIntegerProperty(0);

    static {
        for(int i=0;i<10;i++)
            killer.getChildren().add(new Rectangle(i*Game.BLOCKSIZE+Game.BLOCKSIZE*2,-Game.BLOCKSIZE,Game.BLOCKSIZE,Game.BLOCKSIZE));
    }

    public boolean isCollided(){
        return collided;
    }

    public Block(Stage stage) {
        super();
        collided=false;
        Color c=Color.color(Math.random(),Math.random(),Math.random());

        int i=rnd.nextInt(3);
        switch (i){
            case 0:
                shape=0;
                this.getChildren().add(new Pixel(3,1,c));
                this.getChildren().add(new Pixel(4,1,c));
                this.getChildren().add(new Pixel(5,1,c));
                this.getChildren().add(new Pixel(6,1,c));
                stage.show();
                System.out.println(shape);
                break;
            case 1:
                shape=1;
                this.getChildren().add(new Pixel(4,0,c));
                this.getChildren().add(new Pixel(5,0,c));
                this.getChildren().add(new Pixel(4,1,c));
                stage.show();
                System.out.println(shape);
                break;
            case 2:
                shape=99;
                this.getChildren().add(new Pixel(4,0,c));
                this.getChildren().add(new Pixel(4,1,c));
                this.getChildren().add(new Pixel(5,0,c));
                this.getChildren().add(new Pixel(5,1,c));
                stage.show();
                System.out.println(shape);
                break;
            default:
                System.err.println("wrong shape"+i);
                break;

        }

    }

    public void move(int movement,Pane gamescreen){

        switch(movement){
            case 0:
                //drehen, + 90°
                switch(shape){
                    case 0:
                        //4 pixel stab - liegend->stehend
                        ((Pixel)this.getChildren().get(0)).move(1,1);
                        ((Pixel)this.getChildren().get(2)).move(-1,-1);
                        ((Pixel)this.getChildren().get(3)).move(-2,-2);
                        shape=10;
                        break;
                    case 1:
                        //quadrat - 1 pixel
                        ((Pixel)this.getChildren().get(1)).move(0,1);
                        shape=11;
                        break;

                    case 10:
                        //4 pixel stab - stehend->liegend
                        ((Pixel)this.getChildren().get(0)).move(-1,-1);
                        ((Pixel)this.getChildren().get(1)).move(0,0);
                        ((Pixel)this.getChildren().get(2)).move(1,1);
                        ((Pixel)this.getChildren().get(3)).move(2,2);
                        shape=0;
                        break;
                    case 11:
                        //quadrat - 1 pixel
                        ((Pixel)this.getChildren().get(0)).move(1,0);
                        shape=12;
                        break;
                    case 12:
                        //quadrat - 1 pixel
                        ((Pixel)this.getChildren().get(2)).move(0,-1);
                        shape=13;
                        break;
                    case 13:
                        //quadrat - 1 pixel
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

                break;
            case 2:
                for(Node pixel:this.getChildren())
                    ((Pixel)pixel).move(0,1);
                if(checkIntersection(gamescreen)) {
                    collided=true;
                    for (Node pixel : this.getChildren())
                        ((Pixel) pixel).move(0, -1);
                }
                break;
            case 3:
                for(Node pixel:this.getChildren())
                    ((Pixel)pixel).move(-1,0);
                if(checkIntersection(gamescreen))
                    for(Node pixel:this.getChildren())
                        ((Pixel)pixel).move(1,0);
                break;
            case 4:
                for(Node pixel:this.getChildren())
                    ((Pixel)pixel).move(1,0);
                if(checkIntersection(gamescreen))
                    for(Node pixel:this.getChildren())
                        ((Pixel)pixel).move(-1,0);
                break;
        }
    }

    public boolean checkIntersection(Pane other){
        for (Node pixel:this.getChildren())
            for (Node node:other.getChildren()){
                Shape intersect = Shape.intersect((Rectangle)pixel, (Rectangle)node );
                if (intersect.getBoundsInLocal().getWidth() != -1) {
                    return true;
                }
        }

        return false;
    }

    //10 verschiedene automatisch generierte rechtecke, 22 mal

    public void lineRM(){
        int i=0;
        int i1;
        int i2;
        for(i1=0;i1<=22;i1++){
            for(Node node:killer.getChildren())
                ((Rectangle)node).relocate(((Rectangle)node).getX(),((Rectangle)node).getY()-Game.BLOCKSIZE);

            for(i2=0;i2<=10;i2++){
                for(Node node:killer.getChildren())
                    ((Rectangle)node).relocate(((Rectangle)node).getX(),((Rectangle)node).getY()-Game.BLOCKSIZE);
                Shape intersect = Shape.intersect((Rectangle)pixel, RectangleBuilder.create().x(-100).y(-100)
                        .width(200)
                        .height(200));
                if (intersect.getBoundsInLocal().getWidth() != -1) {
                    break;
                }
            }
            if(i2==10)
                i++;
        }

        for(Node pixel:killer.getChildren())
            for (Node node:killer.getChildren()){
                Shape intersect = Shape.intersect((Rectangle)pixel, (Rectangle)node );
                if (intersect.getBoundsInLocal().getWidth() != -1) {

                }
            }
    }
}
