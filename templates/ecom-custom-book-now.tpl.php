<?php
/**
*
*/
?>
<div class="container container-bn">

  <!-- Title Image -->
  <div class="row">
    <div class="col-xs-12 col-sm-12 col-md-12">
      <?php
        print jnc_style_render_block('block', 92);
      ?>
    </div>
  </div>
  <!-- End Title -->

  <div class="row row-separator hidden-mobile img-responsive"></div>
 
  <div class="row"><!-- Content -->

    <div class="col-xs-12 col-sm-12 col-md-5 bn-left-sidebar">
      <?php
        print jnc_style_render_block('block', 93);
      ?>
    </div>

    <div class="col-xs-11 col-sm-12 col-md-7 bn-right-sidebar"><!-- form -->

      <div class="row">
        <div class="col-xs-2 col-sm-2 col-md-2 bn-form-step vfirst">
          <img src="/statics/img/drupal-form/book-now/1_active.png" id="bn-form-step-1">
        </div>
        <div class="col-xs-10 col-sm-10 col-md-10 bn-form-step-title">
          Select your service
        </div>
      </div>

      <div class="row" id="bn-navigation">
        <div class="col-xs-2 col-sm-2 col-md-2 bn-step-vline" id="bn-step-vline1">
        </div>
        <div class="col-xs-10 col-sm-10 col-md-10 bn-nav-items">
          <div id="bn-nav1">
            <img src="/statics/img/drupal-form/book-now/book-now-nav1.png">
          </div>
          <div id="bn-nav2">
            <img src="/statics/img/drupal-form/book-now/book-now-nav2.png">
          </div>
        </div>
      </div>

      <div class="row" id="bc-form-container"><!-- Book Consultant Form -->

        <!-- Centre Section -->
        <div class="row">
          <div class="col-xs-2 col-sm-2 col-md-2 bn-form-step">
            <img src="/statics/img/drupal-form/book-now/2_active.png" id="bn-form-step-2">
          </div>
          <div class="col-xs-10 col-sm-10 col-md-10 bn-form-step-title">
            Find your nearest centre</br>
          </div>
        </div>

        <div class="row bc-form-centre">
          <div class="col-xs-2 col-sm-2 col-md-2 bn-step-vline" id="bn-step-vline2">
          </div>
          <div class="col-xs-10 col-sm-10 col-md-10 bc-form-centre-items">

            <div class="row bn-state-region">
              <div class="col-xs-6 col-md-6 bn-form-item-label">
                State/Region <span class="bn-form-item-required">*</span>
              </div>
              <div class="col-xs-6 col-sm-6  col-md-6 bn-form-item-label-right" >
                <div><span class="bn-form-item-required">*</span> Required Fields</div>
              </div>  
            </div>

            <div class="row bn-state-region">
              <?php 
                unset($form['bc_state_region']['#title']);
                print render($form['bc_state_region']); 
              ?>
            </div>

            <div class="row">
              <div class="col-xs-12 col-sm-12 col-md-12 bn-form-item-label">
                Centre <span class="bn-form-item-required">*</span>
              </div>
            </div>

            <div class="row">
              <?php 
                unset($form['bc_centre']['#title']);
                print render($form['bc_centre']); 
              ?>
            </div>

            <div class="row" id="no-centre-image">
              <div id="no-centre-text">
              You could be eligible for Jenny Craig at Home (JCAH), where you can meet your consultant over the phone anywhere and have your Jenny Craig meals delivered to you. Too easy!
              <br><br>
              Complete the form and a Jenny Craig representative will contact you at your chosen time.

              </div>
            </div>

          </div>          

        </div>

        <!-- End Centre Section -->

        <!-- Date & Time Section -->
        <div class="row">
          <div class="col-xs-2 col-sm-2 col-md-2 bn-form-step">
            <img src="/statics/img/drupal-form/book-now/3_inactive.png" id="bn-form-step-3">
          </div>
          <div class="col-xs-10 col-sm-10 col-md-10 bn-form-step-title">
            Date & Time
          </div>
        </div>

        <div class="row bc-form-date-time">
          <div class="col-xs-2 col-sm-2 col-md-2 bn-step-vline" id="bn-step-vline3">
          </div>
          <div class="col-xs-10 col-sm-10 col-md-10 bc-form-date-time-items">

            <div class="row">
              <div class="col-xs-12 col-sm-12 col-md-12 bn-form-item-label">
                <span class="bn-form-label-desc">
                  Appointment times are subject to availability and will be confirmed by your consultant over the phone
                </span>
                </br>Date <span class="bn-form-item-required">*</span>
              </div>
            </div>

            <div class="row">
              <?php 
                unset($form['bc_date']['#title']);
                print render($form['bc_date']); 
              ?>
            </div>

            <div class="row">
              <div id="datepicker-custom"></div>
            </div>

            <div class="row">
              <div class="col-xs-12 col-sm-12 col-md-12 bn-form-item-label">
                Please select your preferred time <span class="bn-form-item-required">*</span>
              </div>
            </div>

            <div class="row">
              <?php 
                unset($form['bc_time']['#title']);
                print render($form['bc_time']); 
              ?>
            </div>

            <div class="row">
              <table id="table-bc-time">
                <tbody>
                  <tr id="tr-bc-time">
                    <td id="Morning" class="bc-date-time">Morning</td>
                    <td id="Afternoon" class="bc-date-time">Afternoon</td>
                    <td id="Evening" class="bc-date-time">Evening</td>
                    <td id="Morning" class="bc-date-time">Anytime</td>
                  </tr>
                </tbody>
              </table>
            </div>

          </div>          

        </div>

        <!-- End Date & Time Section -->

        <!-- Personal Details Section -->
        <div class="row">
          <div class="col-xs-2 col-sm-2 col-md-2 bn-form-step">
            <img src="/statics/img/drupal-form/book-now/4_inactive.png" id="bn-form-step-4">
          </div>
          <div class="col-xs-10 col-sm-10 col-md-10 bn-form-step-title">
            Personal Details</br>
          </div>
        </div>

        <div class="row bc-form-personal-details">
          <div class="col-xs-2 col-sm-2 col-md-2" id="bn-step-vline4">
          </div>
          <div class="col-xs-10 col-sm-10 col-md-10 bc-form-personal-details-items">

            <div class="row">
              <div class="col-xs-12 col-sm-12 col-md-12 bn-form-item-label">
                First Name <span class="bn-form-item-required">*</span>
              </div>
            </div>

            <div class="row">
              <?php 
                unset($form['bc_first_name']['#title']);
                print render($form['bc_first_name']); 
              ?>
            </div>


            <div class="row">
              <div class="col-xs-12 col-sm-12 col-md-12 bn-form-item-label">
                Last Name <span class="bn-form-item-required">*</span>
              </div>
            </div>

            <div class="row">
              <?php 
                unset($form['bc_last_name']['#title']);
                print render($form['bc_last_name']); 
              ?>
            </div>

            <div class="row">
              <div class="col-xs-12 col-sm-12 col-md-12 bn-form-item-label">
                Email <span class="bn-form-item-required">*</span>
              </div>
            </div>

            <div class="row">
              <?php 
                unset($form['bc_email']['#title']);
                print render($form['bc_email']); 
              ?>
            </div>

            <div class="row">
              <div class="col-xs-12 col-sm-12 col-md-12 bn-form-item-label">
                Contact Number <span class="bn-form-item-required">*</span>
              </div>
            </div>

            <div class="row">
              <?php 
                unset($form['bc_contact_number']['#title']);
                print render($form['bc_contact_number']); 
              ?>
            </div>

            <div class="row">
              <div class="col-xs-12 col-sm-12 col-md-12 bn-form-item-label">
                How much weight would you like to lose?
              </div>
            </div>

            <div class="row">
              <?php 
                unset($form['bc_weight_loss']['#title']);
                print render($form['bc_weight_loss']); 
              ?>
            </div>

            <div class="row">
              <div class="col-xs-12 col-sm-12 col-md-12 bn-form-item-label">
                Have you tried other weight loss/ meal convenience programs?
              </div>
            </div>

            <div class="row">
              <?php 
                unset($form['bc_other_weight_loss']['#title']);
                print render($form['bc_other_weight_loss']); 
              ?>
            </div>

            <div class="row" class="bn-form-checkbox">
              <?php 
                print render($form['bc_subscribe']); 
              ?>
            </div>

            <div class="row">
              <?php 
                print render($form['bc_submit']); 
              ?>
            </div>
            <div class="row">
              <p>&nbsp;</p>
              <p>Your information will be kept private in accordance with our <a href="#">Privacy Policy</a>.</p>
              <p>By submitting the information above, I acknowledge, accept and agree that I may be contacted by Jenny Craig and/or its representatives directly by telephone, email or SMS in relation to my request.</p>
            </div>
          </div>          

        </div>

        <!-- End Personal Section -->

      </div><!-- End Book Consultant Form -->

      <div class="row" id="rc-form-container"><!-- Request Call Form -->

        <div class="row">
          <div class="col-xs-2 col-sm-2 col-md-2 bn-form-step">
            <img src="/statics/img/drupal-form/book-now/2_active.png" id="bn-form-step-2">
          </div>
          <div class="col-xs-10 col-sm-10 col-md-10 bn-form-step-title">
            Personal Details</br>
          </div>
        </div>

        <div class="row rc-form-personal-details">
          <div class="col-xs-2 col-sm-2 col-md-2">
          </div>
          <div class="col-xs-10 col-sm-10 col-md-10 rc-form-personal-details-items">

            <div class="row">
              <div class="col-xs-12 col-sm-12 col-md-12 bn-form-item-label">
                First Name <span class="bn-form-item-required">*</span>
              </div>
            </div>

            <div class="row">
              <?php 
                unset($form['rc_first_name']['#title']);
                print render($form['rc_first_name']); 
              ?>
            </div>


            <div class="row">
              <div class="col-xs-12 col-sm-12 col-md-12 bn-form-item-label">
                Last Name <span class="bn-form-item-required">*</span>
              </div>
            </div>

            <div class="row">
              <?php 
                unset($form['rc_last_name']['#title']);
                print render($form['rc_last_name']); 
              ?>
            </div>

            <div class="row">
              <div class="col-xs-12 col-sm-12 col-md-12 bn-form-item-label">
                Email <span class="bn-form-item-required">*</span>
              </div>
            </div>

            <div class="row">
              <?php 
                unset($form['rc_email']['#title']);
                print render($form['rc_email']); 
              ?>
            </div>

            <div class="row">
              <div class="col-xs-12 col-sm-12 col-md-12 bn-form-item-label">
                Contact Number <span class="bn-form-item-required">*</span>
              </div>
            </div>

            <div class="row">
              <?php 
                unset($form['rc_contact_number']['#title']);
                print render($form['rc_contact_number']); 
              ?>
            </div>

            <div class="row bn-state-region">
              <div class="col-xs-12 col-sm-12 col-md-12 bn-form-item-label">
                State/Region <span class="bn-form-item-required">*</span>
              </div>
            </div>

            <div class="row bn-state-region">
              <?php 
                unset($form['rc_state_region']['#title']);
                print render($form['rc_state_region']); 
              ?>
            </div>

            <div class="row">
              <div class="col-xs-12 col-sm-12 col-md-12 bn-form-item-label">
                Centre <span class="bn-form-item-required">*</span>
              </div>
            </div>

            <div class="row">
              <?php 
                unset($form['rc_centre']['#title']);
                print render($form['rc_centre']); 
              ?>
            </div>

            <div class="row" class="bn-form-checkbox">
              <?php 
                print render($form['rc_before']); 
              ?>
            </div>

            <div class="row" class="bn-form-checkbox">
              <?php 
                print render($form['rc_home_delivery']); 
              ?>
            </div>

            <div class="row" class="bn-form-checkbox">
              <?php 
                print render($form['rc_subscribe']); 
              ?>
            </div>

            <div class="row">
              <?php 
                print render($form['rc_submit']); 
              ?>
            </div>

            <div class="row">
              <p>&nbsp;</p>
              <p>Your information will be kept private in accordance with our <a href="#">Privacy Policy</a>.</p>
              <p>By submitting the information above, I acknowledge, accept and agree that I may be contacted by Jenny Craig and/or its representatives directly by telephone, email or SMS in relation to my request.</p>
            </div>

          </div>          

        </div>

      </div><!-- End Request Call Form -->

    </div> <!-- form -->
  </div><!--Content -->

</div> <!-- container -->
<?php print drupal_render_children($form); ?>   

