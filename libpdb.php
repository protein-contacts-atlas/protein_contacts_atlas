<?php
////////////////////////////////////////////////////////////
// PDB manipulation class
// luki@mbi.ucla.edu
// Updated: January 11, 2010
////////////////////////////////////////////////////////////

define('PI', 3.141592653589793238462643383279);

class ArrayClass implements Iterator, ArrayAccess {

protected $data;

function __construct() {
  $this->data = array();
}

// Clone (dereference) all children objects
function __clone() {
  foreach($this->data as $node => $child)
    $this->data[$node] = clone $child;
}

//////////////////////////////
// Interator support

function rewind() { reset($this->data); }
function current() { return current($this->data); }
function next() { return next($this->data); }
function key() { return key($this->data); }
function valid() { return key($this->data) !== null; }

//////////////////////////////
// ArrayAccess support

function offsetExists($n) { return isset($this->data[$n]); }
function offsetGet($n) { return $this->data[$n]; }
function offsetSet($n, $v) { $this->data[$n] = $v; }
function offsetUnset($n) { unset($this->data[$n]); }

};

////////////////////////////////////////////////////////////
// Common manipulation functions for PDB Objects
////////////////////////////////////////////////////////////

class PDBArrayClass extends ArrayClass {

// Output formatting
function __tostring() { return $this->tostring(); }

function tostring($args =array()) {
  foreach($this->data as $n => $o) 
    $r .= $o->tostring(array_merge($args, array($n)));
  return $r;
}

// Closest atom search
function closest_atom($set, $args=array(), $b=null) {
  foreach($this->data as $n => $o) {
    $d = $o->closest_atom($set, array_merge($args, array($n)), $b);
    if($d[dist] > 0 && (!isset($r) || $r[dist] > $d[dist]))
      $r = $d;
  }
  return $r;
}

// Rotate all children objects
function rotate($a, $b, $c) {
  foreach($this->data as $n => $o)
    $o->rotate($a, $b, $c);
}

function rotate_matrix($m) {
  foreach($this->data as $n => $o)
    $o->rotate_matrix($m);
}

// Translate all children objects
function translate($x, $y =null, $z =null) {
  if(is_object($x)) {
    $z = $x->z;
    $y = $x->y;
    $x = $x->x;
  }
  foreach($this as $o)
    $o->translate($x, $y, $z);
}

};

////////////////////////////////////////////////////////////
// This vector class is used to represent points in 3D space (atoms)
// as well as perform linear algebra calculations on vectors
////////////////////////////////////////////////////////////

class Vector {
  public $x, $y, $z;

function Vector($x =0, $y =0, $z =0) {
  $this->x = $x;
  $this->y = $y;
  $this->z = $z;
}

function __get($n) {
  switch($n) {
    case 'magnitude':
      // Calculate the magnitude of this vector
      return sqrt(pow($this->x, 2) + pow($this->y, 2) + pow($this->z, 2)); 
    case 'unit_vector':
      // Convert this vector to a unit vector (magnitude 1)
      $d = $this->magnitude;
      return $d ? new Vector($this->x/$d, $this->y/$d, $this->z/$d) : new Vector();
    case 'reverse':
      // Create a new vector with the directions of all three components reversed
      return new Vector(-$this->x, -$this->y, -$this->z);
  }  
}

function __tostring() { return $this->tostring(); }
function tostring() {
  return "(".round($this->x, 4).','.round($this->y,4).','.round($this->z, 4).')';
}

function assign($v) {
  $this->x = $v->x;
  $this->y = $v->y;
  $this->z = $v->z;
}

// Translate this coordinate point by delta x, y and z
function translate($dx, $dy, $dz) {
  $this->x += $dx;
  $this->y += $dy;
  $this->z += $dz;
}

// Create a new vector of this + p
function add($p) {
  return new Vector($this->x + $p->x, $this->y + $p->y,  $this->z + $p->z); 
}

// Create a difference vector between point p and this
function subtract($p) {
  return new Vector($this->x - $p->x, $this->y - $p->y,  $this->z - $p->z); 
}

// Createa a new vector with all components of this vector multiplies by a scalar $s
function multiply($s) {
  return new Vector($this->x * $s, $this->y * $s,  $this->z * $s); 
}

// Calculate the dot product with another vector $p
function dot_cos($p) {
  return $this->x*$p->x + $this->y*$p->y + $this->z*$p->z;
}

// Calcularte the cross product with another vector $p
function cross($p) {
  return new Vector($this->y*$p->z - $this->z*$p->y,  $this->z*$p->x - $this->x*$p->z,  $this->x*$p->y - $this->y*$p->x);
}

// Calculate the distance (magnitude) of this vector
function dist($p) {
  return $this->subtract($p)->magnitude;
}

// Rotate this single coordinate point by specified angles alpha, beta, gamma (in degrees)
function rotate($a, $b, $c) {
  // a,b,c: angles in degrees
  foreach(array($a, $b, $c) as $i => $angle) {
    if(!$angle)
      continue;
    $angle = $angle/180*PI;
    switch($i) {
      case 0: $m = array(array(1, 0, 0), array(0, cos($angle), -sin($angle)), array(0, sin($angle), cos($angle))); break;
      case 1: $m = array(array(cos($angle), 0, sin($angle)), array(0, 1, 0), array(-sin($angle), 0, cos($angle))); break;
      case 2: $m = array(array(cos($angle), -sin($angle), 0), array(sin($angle), cos($angle), 0), array(0, 0, 1)); break;
    }
    $this->rotate_matrix($m);
  }  
}

// Apply rotation matrix to this single coordinate point
function rotate_matrix($m) {

  $x = $this->x;
  $y = $this->y;
  $z = $this->z;

  foreach(array('x','y','z') as $i => $c) 
    $this->$c = $x*$m[0][$i] + $y*$m[1][$i] + $z*$m[2][$i];
}

// Calculate rotation matrix for a specified angle (in degrees) 
// around the axis defined by this vector
// Based on: http://en.wikipedia.org/wiki/Rotation_matrix
function calc_rotmatrix_from_angle($angle) {

  $c = cos($angle/180*PI);
  $s = sin($angle/180*PI);

  $u = $this->unit_vector;
  $r = array(
    array(pow($u->x, 2) + (1-pow($u->x, 2)) * $c,
        $u->x*$u->y*(1-$c) - $u->z*$s,
        $u->x*$u->z*(1-$c) + $u->y*$s
    ),
    array($u->x*$u->y*(1-$c) + $u->z*$s,
        pow($u->y, 2) + (1-pow($u->y, 2)) * $c,
        $u->y*$u->z*(1-$c) - $u->x*$s
    ),
    array($u->x*$u->z*(1-$c) - $u->y*$s,
        $u->y*$u->z*(1-$c) + $u->x*$s,
        pow($u->z, 2) + (1-pow($u->z, 2)) * $c,
    ),
  );
  return $r;
}

};

////////////////////////////////////////////////////////////
// PDB File object, a collection pf PDBChains
////////////////////////////////////////////////////////////

class PDBFile extends PDBArrayClass {

public $id, $filename;

// Public construction:
// load PDB from file or string
function __construct($s ='') {

  parent::__construct();
  if(!$s)
    return;
  if(!strstr($s, "\n")) {
    $this->filename = $s;
    $s = file_get_contents($s);
  }
  if($s)
    $this->_load_pdb($s);
}

// Private PDB loader
protected function _load_pdb($pdb) {

  if(!is_array($pdb))
    $pdb = explode("\n", $pdb);

 //ADDED BY MELIS
  $this->checkType = 0;
  $this->checkSS = 0;
  $this->checkNMR = 0;

  foreach($pdb as $line) {
    $line = trim($line);
	
	 //echo substr($line, 0, 5) . "\n";
	 //echo $line . "\n";
	 
    if(substr($line, 0, 6) == 'ATOM  ') {
      // ATOM      1  N   ASN A   1      26.432   9.934   6.286  1.00  4.79      E    N
      $loc = $line[16];
      if($loc != ' ' && $loc != 'A')
        continue;
      $chain = substr($line, 21, 1);
      $resi  = substr($line, 17, 4);
      $nresi = (int)substr($line, 22, 4);
      $atom  = trim(substr($line, 13, 3));

      if(!isset($this[$chain]))
        $this[$chain] = new PDBChain;

      if(!isset($this[$chain][$nresi]))
        $this[$chain][$nresi] = new PDBResidue($resi);
      $this[$chain][$nresi][$atom] = new PDBAtom($line);
    } elseif(substr($line, 0, 6) == 'HEADER') {
      $this->id = substr($line, 62, 4);
    }

	// THE FOLLOWING PARTS ARE ADDED BY MELIS TO CHECK FOR X-RAY STRUCTURES
	elseif(substr($line, 0, 6) == 'EXPDTA') {
	      $this->type = substr($line, 10, 5);
		  $this->checkType = -1;
		 // echo $this->checkType;
	    }

	elseif(substr($line, 0, 5) == 'MODEL' || substr($line, 0, 6) == 'ENDMDL') {
	      $this->type = "NMRorMD";
		  $this->checkNMR = -1;
	    }

	elseif(substr($line, 0, 5) == 'HELIX' || substr($line, 0, 5) == 'SHEET') {
	      $this->checkSS = -1;
	    }
	
  }
}

function __get($v) {
  switch($v) {
    case 'fasta':
      foreach($this->data as $chain => $residues)
        $r .= ">$this->id:$chain\n" . $residues->sequence . "\n";
      return $r;

    case 'chains':
      return array_keys($this->data);

    case 'pdb':
      $natom = 0;
      return $this->tostring(array(&$natom));

    case 'center':
      foreach($this->data as $chain) {
        $c = $chain->center;
        $center[0] += $c->x;
        $center[1] += $c->y;
        $center[2] += $c->z;
        $n++;
      }
      return $n ? new Vector($center[0]/$n, $center[1]/$n, $center[2]/$n) : new Vector();

  }
  return null;
}

function tostring() {
  $i = 0;
  return parent::tostring(array(&$i));
}

};

////////////////////////////////////////////////////////////

class PDBChain extends PDBArrayClass {

// Translate the entire chain
function translate($x, $y =null, $z =null) {
  if(is_object($x)) {
    $z = $x->z;
    $y = $x->y;
    $x = $x->x;
  }
  foreach($this as $residue)
    $residue->translate($x, $y, $z);
}

function __get($v) {
  switch($v) {
    case 'sequence':
      if(!$this->data)
        return '';

      $keys = array_keys($this->data);
      sort($keys);
      for($i = $keys[0]; $i <= $keys[count($keys)-1]; $i++)
        $r .= isset($this[$i]) ? $this[$i]->a : '-';
      return $r;

    case 'count':
      return count($this->data);

    case 'numbers':
      return array_keys($this->data);

    case 'center':
      foreach($this->data as $residue) {
        $c = $residue->center;
        $center[0] += $c->x;
        $center[1] += $c->y;
        $center[2] += $c->z;
        $n++;
      }
      return $n ? new Vector($center[0]/$n, $center[1]/$n, $center[2]/$n) : new Vector();
  }
  return null;
}

// Extract a selection of residues
function extract($list, $end=null) {

  if(!is_array($list))
    $list = range($list, $end ? $end : $list);

  $r = new PDBChain;
  foreach($list as $n)
    if(isset($this[$n]))
      $r[$n] = clone($this[$n]);
  return $r;
}

};

////////////////////////////////////////////////////////////

class PDBResidue extends PDBArrayClass {

public $aa;

// const does not support arrays!
public static $aa3to1 =
 array('ALA' => 'A', 'CYS' => 'C', 'ASP' => 'D', 'GLU' => 'E', 'PHE' => 'F', 'GLY' => 'G', 'HIS' => 'H',
       'ILE' => 'I', 'LYS' => 'K', 'LEU' => 'L', 'MET' => 'M', 'ASN' => 'N', 'PRO' => 'P', 'GLN' => 'Q',
       'ARG' => 'R', 'SER' => 'S', 'THR' => 'T', 'VAL' => 'V', 'TRP' => 'W', 'TYR' => 'Y', 'MSE' => 'M');

public static $BACKBONE_ATOMS = array('N','CA','C','O');

function __construct($aa) {
  $this->aa = trim($aa);
}

function __get($v) {
  switch($v) {
    case 'a':
      return self::$aa3to1[$this->aa];
    case 'center':
      foreach($this->data as $atom) {
        $c = $atom->center;
        $center[0] += $c->x;
        $center[1] += $c->y;
        $center[2] += $c->z;
        $n++;
      }
      return $n ? new Vector($center[0]/$n, $center[1]/$n, $center[2]/$n) : new Vector();

    case 'backbone_center':
      foreach($this->data as $atom) {
        if(!in_array($atom->element, array('N','C','CA','O')))
          continue;
        $c = $atom->center;
        $center[0] += $c->x;
        $center[1] += $c->y;
        $center[2] += $c->z;
        $n++;
      }
      return $n ? new Vector($center[0]/$n, $center[1]/$n, $center[2]/$n) : new Vector();
  }
}

// Extract a selection of atoms
function extract($list) {
  $r = new PDBResidue($this->aa);
  foreach($this->data as $n => $atom)
    if(in_array($atom->element, $list))
      $r[$n] = clone($atom);
  return $r;
}

function tostring($args =array()) {
  $args[] = $this->aa;
  foreach($this->data as $n => $o) 
    $r .= $o->tostring(array_merge($args, array($n)));
  return $r;
}

};

////////////////////////////////////////////////////////////

class PDBAtom extends Vector {

public $o, $b, $element;

function __construct($pdb_line ='') {
  if(!$pdb_line)
    return;
  $this->x = (float)substr($pdb_line, 30, 8);
  $this->y = (float)substr($pdb_line, 38, 8);
  $this->z = (float)substr($pdb_line, 46, 8);
  $this->o = (float)substr($pdb_line, 54, 6);
  $this->b = (float)substr($pdb_line, 60, 6);
  $this->element = trim(substr($pdb_line, 13, 4));
}

function __get($n) {
  switch($n) {
    case 'center':
      return $this;
    default:
      return parent::__get($n);
  }
}

function closest_atom($set, $a_path =array(), $b_path =array()) {
  if($set instanceOf Vector)
    return array(dist => $this->dist($set), a => $set, b => $this, a_path => $b_path, b_path => $a_path);
  return $set->closest_atom($this, array(), $a_path);
}

function tostring($args =array()) {

  static $natom =0;
  return sprintf("ATOM  %5d  %-4s%-4s%s%4d    %8.3f%8.3f%8.3f%6.2f%6.2f           %s\n",
    ++$args[0],
    $this->element,
    $args[3],
    $args[1],
    $args[2],
    $this->x,
    $this->y,
    $this->z,
    $this->o,
    $this->b,
    $this->element[0]);
}

};

?>