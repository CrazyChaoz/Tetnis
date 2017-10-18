package Game;


import javafx.beans.property.IntegerProperty;
import javafx.beans.property.SimpleIntegerProperty;
import javafx.scene.Group;
import javafx.scene.Node;
import javafx.scene.layout.Pane;
import javafx.scene.paint.Color;
import javafx.scene.shape.Rectangle;
import javafx.scene.shape.Shape;
import javafx.stage.Stage;

import java.util.*;


/**
 * Idea
 * make static blocks, move them to nowhere, activate them when necessary
 */


public class Block extends Pane {
    private boolean collided;
    private int shape;
    private static final Random rnd = new Random();

    public IntegerProperty killedLines = new SimpleIntegerProperty(0);


    public boolean isCollided() {
        return collided;
    }

    public Block(Stage stage) {
        super();
        collided = false;
        Color c = Color.color(Math.random(), Math.random(), Math.random());

        int i = rnd.nextInt(3);
        switch (i) {
            case 0:
                shape = 0;
                this.getChildren().add(new Pixel(3, 1, c));
                this.getChildren().add(new Pixel(4, 1, c));
                this.getChildren().add(new Pixel(5, 1, c));
                this.getChildren().add(new Pixel(6, 1, c));
                stage.show();
                System.out.println(shape);
                break;
            case 1:
                shape = 1;
                this.getChildren().add(new Pixel(4, 0, c));
                this.getChildren().add(new Pixel(5, 0, c));
                this.getChildren().add(new Pixel(4, 1, c));
                stage.show();
                System.out.println(shape);
                break;
            case 2:
                shape = 99;
                this.getChildren().add(new Pixel(4, 0, c));
                this.getChildren().add(new Pixel(4, 1, c));
                this.getChildren().add(new Pixel(5, 0, c));
                this.getChildren().add(new Pixel(5, 1, c));
                stage.show();
                System.out.println(shape);
                break;
            default:
                System.err.println("wrong shape" + i);
                break;

        }

    }

    public void move(int movement, Group gamescreen) {

        switch (movement) {
            case 0:
                //drehen, + 90°
                switch (shape) {
                    case 0:
                        //4 pixel stab - liegend->stehend
                        ((Pixel) this.getChildren().get(0)).move(1, 1);
                        ((Pixel) this.getChildren().get(2)).move(-1, -1);
                        ((Pixel) this.getChildren().get(3)).move(-2, -2);
                        shape = 10;
                        break;
                    case 1:
                        //quadrat - 1 pixel
                        ((Pixel) this.getChildren().get(1)).move(0, 1);
                        shape = 11;
                        break;

                    case 10:
                        //4 pixel stab - stehend->liegend
                        ((Pixel) this.getChildren().get(0)).move(-1, -1);
                        ((Pixel) this.getChildren().get(1)).move(0, 0);
                        ((Pixel) this.getChildren().get(2)).move(1, 1);
                        ((Pixel) this.getChildren().get(3)).move(2, 2);
                        shape = 0;
                        break;
                    case 11:
                        //quadrat - 1 pixel
                        ((Pixel) this.getChildren().get(0)).move(1, 0);
                        shape = 12;
                        break;
                    case 12:
                        //quadrat - 1 pixel
                        ((Pixel) this.getChildren().get(2)).move(0, -1);
                        shape = 13;
                        break;
                    case 13:
                        //quadrat - 1 pixel
                        ((Pixel) this.getChildren().get(1)).move(0, -1);
                        ((Pixel) this.getChildren().get(0)).move(-1, 0);
                        ((Pixel) this.getChildren().get(2)).move(0, 1);


                        shape = 1;
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
                for (Node pixel : this.getChildren())
                    ((Pixel) pixel).move(0, 1);
                if (checkIntersection(gamescreen)) {
                    collided = true;
                    for (Node pixel : this.getChildren())
                        ((Pixel) pixel).move(0, -1);
                }
                break;
            case 3:
                for (Node pixel : this.getChildren())
                    ((Pixel) pixel).move(-1, 0);
                if (checkIntersection(gamescreen))
                    for (Node pixel : this.getChildren())
                        ((Pixel) pixel).move(1, 0);
                break;
            case 4:
                for (Node pixel : this.getChildren())
                    ((Pixel) pixel).move(1, 0);
                if (checkIntersection(gamescreen))
                    for (Node pixel : this.getChildren())
                        ((Pixel) pixel).move(-1, 0);
                break;
        }
    }

    //10 verschiedene automatisch generierte rechtecke, 22 mal


    public boolean checkIntersection(Group other) {

        for (Node pixel : this.getChildren())


            for (Node node : other.getChildren()) {
                Shape intersect = Shape.intersect((Rectangle) pixel, (Rectangle) node);
                if (intersect.getBoundsInLocal().getWidth() != -1) {
                    return true;
                }
            }

        return false;
    }


    public static void lineRM(Group gamescreen) {
        Rectangle killer = new Rectangle(Game.BLOCKSIZE, Game.BLOCKSIZE);

        List<Double> removeLines =new ArrayList<>();
        gamescreen.getChildren().add(killer);

        int i = 0;
        int i1;
        int i2;
        int i3;
        for (i1=0; i1 < 20; i1++) {
            i3=0;
            for (i2 = 0; i2 < 10; i2++) {
                killer.relocate(Game.BLOCKSIZE * 2 + Game.BLOCKSIZE * i2, Game.BLOCKSIZE * i1);
                for (Node node:gamescreen.getChildren()){
                    if(node!=killer){
                        Shape intersect = Shape.intersect((Rectangle)node, killer);
                        if (intersect.getBoundsInLocal().getWidth() != -1) {
                            //System.out.println(node.getBoundsInParent().getMinY());
                            i3++;
                        }
                    }
                }
            }
            if (i3==10){
                //X:Game.BLOCKSIZE*2+Game.BLOCKSIZE*i2
                //Y:Game.BLOCKSIZE*i1
                removeLines.add(Game.BLOCKSIZE*i1+0.0);
                System.out.println("#####"+(Game.BLOCKSIZE*i1+0.0));
                i++;
            }
        }
        for(Double line:removeLines) {
            for (Node node:gamescreen.getChildren())
                if (node.getBoundsInParent().getMinY() == line)
                    gamescreen.getChildren().remove(node);

        }
        System.out.println("Removed lines: " + i);
        gamescreen.getChildren().remove(killer);
    }
}
