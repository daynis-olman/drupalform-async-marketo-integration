<div class="container-bn">
  <!-- form -->

  <div class="row" id="rc-form-container"><!-- Request Call Form -->

    <div class="row">
      <div class="bn-form-step-title">
      Personal Details<br><br>
      </div>
    </div>

    <div class="row rc-form-personal-details">

      <div class="rc-form-personal-details-items">

        <div class="row">
          <div class="bn-form-item-label">
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
          <div class="bn-form-item-label">
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
          <div class="bn-form-item-label">
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
          <div class="bn-form-item-label">
            Contact Number <span class="bn-form-item-required">*</span>
          </div>
        </div>

        <div class="row">
          <?php
            unset($form['rc_contact_number']['#title']);
            print render($form['rc_contact_number']);
          ?>
        </div>
        <?php
          if ($form['rc_state_region']) {
        ?>
        <div class="row bn-state-region">
          <div class="bn-form-item-label">
            State/Region <span class="bn-form-item-required">*</span>
          </div>
        </div>

        <div class="row bn-state-region">
          <?php
            unset($form['rc_state_region']['#title']);
            print render($form['rc_state_region']);
          ?>
        </div>
        <?php
          }
        ?>
        <div class="row">
          <div class="bn-form-item-label">
            Centre <span class="bn-form-item-required">*</span>
          </div>
        </div>

        <div class="row">
          <?php
            unset($form['rc_centre']['#title']);
            print render($form['rc_centre']);
          ?>
          <div class="row" id="no-centre-image">
            <div id="no-centre-text">
            You could be eligible for Jenny Craig at Home (JCAH), where you can meet your consultant over the phone anywhere and have your Jenny Craig meals delivered to you. Too easy!
            <br><br>
            Complete the form and a Jenny Craig representative will contact you at your chosen time.

            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-12 col-sm-12 col-md-12 bn-form-item-label">
            Have you been to Jenny Craig before? <span class="bn-form-item-required">*</span>
          </div>
        </div>
        <div class="row">
          <?php
            unset($form['rc_being_to_jc']['#title']);
            print render($form['rc_being_to_jc']);
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

</div> <!-- container -->
<?php print drupal_render_children($form); ?>
