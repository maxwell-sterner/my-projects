
import org.opensourcephysics.controls.*;
import org.opensourcephysics.frames.*;

//MAKE SURE TO COMMENT THE PRINT COMMANDS IN GAME.JAVA
public class SeasonApp extends AbstractSimulation {
	//use for wins vs games played
  PlotFrame Wins = new PlotFrame("Games Played", "Oxy Wins", "Wins");
  PlotFrame OxyRuns = new PlotFrame("Games Played", "Runs Scored Oxy", "Oxy");
  PlotFrame LaVerneRuns = new PlotFrame("Games Played", "Runs Scored La Verne", "LaVerne");
  
	//use for win rate vs steps
//  PlotFrame Wins = new PlotFrame("Steps", "Oxy Win Rate", "Wins");
//  PlotFrame OxyRuns = new PlotFrame("Steps", "Average Runs Scored Oxy", "Oxy");
//  PlotFrame LaVerneRuns = new PlotFrame("Steps", "Average Runs Scored La Verne", "LaVerne");
  int numgames = 0;
  int OxyPitcher =0;
  int LaVernePitcher=0;
  int steps = 0;
  Pitcher[] OxyPitchers = new Pitcher[4];
  Hitter[] OxyHitters = new Hitter[9];
  Pitcher[] LVPitchers = new Pitcher[4];
  Hitter[] LVHitters = new Hitter[9];

  public SeasonApp() {
	  	OxyPitchers[0] = new Pitcher("Nolan McCarthy",363,68,26);
	  	OxyPitchers[1] = new Pitcher("Tom Butler",271,60,56);
		OxyPitchers[2] = new Pitcher("Diego Ramirez",275,62,16);
		OxyPitchers[3] = new Pitcher("Freshman Mike",40,8,3);
		
		OxyHitters[0] = new Hitter("Reid Gibbs",196,0.369,59,27, 48,10,0);
		OxyHitters[1] = new Hitter("Antonio Andrade",179,0.277,44,17, 29,12,1);
		OxyHitters[2] = new Hitter("Jack Brancheau",190,0.335,52,31, 35,10,1);
		OxyHitters[3] = new Hitter("Michael Ingram",163,0.336,47,17, 34,10,0);
		OxyHitters[4] = new Hitter("Jake Fredrickson",173,0.336,46,33, 27,11,1);
		OxyHitters[5] = new Hitter("Angelo Zorn",145,0.214,38,22, 28,7,0);
		OxyHitters[6] = new Hitter("Eamon McNeil",136,0.291,34,19, 25,5,2);
		OxyHitters[7] = new Hitter("Bryan Smith",116,0.190,19,12, 13,3,1);
		OxyHitters[8] = new Hitter("Jared Baur",117,0.272,25,12, 18,6,0);
		
		LVPitchers[0] = new Pitcher("Devon Burhans",304,77,12);
		LVPitchers[1] = new Pitcher("Cody Norman",296,80,22);
		LVPitchers[2] = new Pitcher("Christopher Peres",163,42,10);
		LVPitchers[3] = new Pitcher("Alfredo Frey",116,26,10);
		
		LVHitters[0] = new Hitter("Adam Cruz",190,0.338,54,24, 39,10,2);
		LVHitters[1] = new Hitter("Christopher Peres",178,0.355,55,20, 37,13,2);
		LVHitters[2] = new Hitter("Jacob Benson",172,0.295,44,20, 39,4,1);
		LVHitters[3] = new Hitter("Ryan Galan",175,0.308,45,22, 39,5,1);
		LVHitters[4] = new Hitter("Tanner Siffert",178,0.274,37,41, 28,7,2);
		LVHitters[5] = new Hitter("Christopher Ligot",164,0.323,43,24, 30,9,3);
		LVHitters[6] = new Hitter("Brandon Shiota",142,0.306,34,24, 24,9,1);
		LVHitters[7] = new Hitter("Brandon Vogel",104,0.272,22,15, 18,3,1);
		LVHitters[8] = new Hitter("Tanner Browning",93,0.416,32,13, 28,4,0);
		
  }

  /**
  * Initializes the simulation.
  */
  public void initialize() {
	  // can control number of games to average
	  //the pitcher for Oxy (0,1,2,3)
	  //and the pitcher for LaVerne (0,1,2,3)
    numgames = control.getInt("Number of Games");
    OxyPitcher = control.getInt("Oxy Pitcher");
    LaVernePitcher = control.getInt("LaVerne Pitcher");
    steps = 0;
    
  }

  /**
  * Does a time step.
  */
  public void doStep() {
	  //runs the same as the Series class but without printouts
	  // runs many games with the same pitchers to calculate win rate
		int wins = 0;
		int totrunsOxy = 0;
		int totrunsLV = 0;
		for(int k = 0;k<numgames;k++) {
			Game g = new Game();
			int oxy = 0;
			int lv = 0;
			int oxyp = OxyPitcher;
			int lavernep = LaVernePitcher;
			for(int i =0;i<9; i++) {
				if(i == 7) {
					oxyp = 3;
					lavernep = 3;
					
				}
				for(int j=0;j<2;j++) {
					while(g.outs < 3) {
						if(j == 0) {
							g.atBat(j, OxyPitchers[oxyp], LVHitters[lv]);
							lv++;
							if(lv>8) {
								lv=0;
							}
					}
						else {
							g.atBat(j, LVPitchers[lavernep], OxyHitters[oxy]);
							oxy++;
							if(oxy>8) {
								oxy=0;
							}
						}
						
					}
					g.baserunners.clear();
					g.outs = 0;
				}
				g.inning++;
				if(g.inning >= 10 && g.homescore ==g.awayscore) {
					i=7;
				}
			}
			//game ends
			if(g.homescore > g.awayscore) {
				wins++;
			}
			totrunsOxy += g.homescore;
			totrunsLV += g.awayscore;
			
			//use to calculate wins and scores as a function of games played
			//USE ONLY ONE STEP
			Wins.append(0, k, wins);
			OxyRuns.append(0, k, g.homescore);
			LaVerneRuns.append(0, k, g.awayscore);
		}
		//calculates the win percentage and average over multiple games
		double Oxyruns = new Double(totrunsOxy);
		double dwins = new Double(wins);
		double LVRuns = new Double(totrunsLV);
		double dnumgames = new Double(numgames);
		System.out.println("Win Percentage: " + dwins/dnumgames);
		System.out.println("Average Runs Scored: " + Oxyruns/dnumgames);
		System.out.println("Average Runs Allowed:  " + LVRuns/dnumgames);
		
		//use for win rate vs step number
//		Wins.append(0, steps, dwins/dnumgames);
//		OxyRuns.append(0, steps, Oxyruns/dnumgames);
//		LaVerneRuns.append(0, steps, LVRuns/dnumgames);
//		steps++;
		
		//modifies pitcher stats every step
		//OxyPitchers[OxyPitcher].THit = OxyPitchers[OxyPitcher].THit-0.005;
		//OxyPitchers[OxyPitcher].TWalk = OxyPitchers[OxyPitcher].TWalk-0.005;
		
		//modifies hitter stats every step
//		OxyHitters[0].BHit = OxyHitters[0].BHit + 0.01;
//		OxyHitters[1].BHit = OxyHitters[1].BHit + 0.01;
//		OxyHitters[2].BHit = OxyHitters[2].BHit + 0.01;
//		OxyHitters[3].BHit = OxyHitters[3].BHit + 0.01;
//		OxyHitters[4].BHit = OxyHitters[4].BHit + 0.01;
//		OxyHitters[5].BHit = OxyHitters[5].BHit + 0.01;
//		OxyHitters[6].BHit = OxyHitters[6].BHit + 0.01;
//		OxyHitters[7].BHit = OxyHitters[7].BHit + 0.01;
//		OxyHitters[8].BHit = OxyHitters[8].BHit + 0.01;
		
  }

  /**
  * Resets the simulation.
  */
  public void reset() {
	control.setValue("Number of Games", 10000);
    control.setValue("Oxy Pitcher", 1);
    control.setValue("LaVerne Pitcher", 0);
  }

  /**
  * Starts the Java application.
  * @param args  command line parameters
  */
  public static void main(String[] args) {
    SimulationControl.createApp(new SeasonApp());
  }
}