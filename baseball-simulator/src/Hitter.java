
public class Hitter {
	
	//each hitter will have the probability they hit and walk
	//if they get a hit, then it will run the probability of a single, double, triple, hr
	
	String name;
	double BHit;
	double BWalk;
	double S;
	double DB;
	double TR;
	
	public Hitter(String name,double PAs, double BA, double hits, double walks, double singles, double doubles, double triples) {
		
		this.name =name;
		
		BHit = BA;
		
		BWalk = walks/PAs;
		
		S = singles/hits;
		
		DB = doubles/hits;
		
		TR = triples/hits;
	}
}
